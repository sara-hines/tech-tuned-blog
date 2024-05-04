const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.create(req.body);

    // A property will be created on the req.session obj called user_id, and set to the autoincremented id created for that user in userData.
    // A property will be created on the req.session obj called logged_in, and it will be set to true.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Post route to http://localhost:3001/api/users/login in order to log in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    console.log(`Here is your userData:
    _________
    ` + userData);

    // If user tries to login but we don't have a matching record for them in our database, we'll tell them, 400, the request failed, you provided incorrect login info. We're just checking for their email at this point.
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If we did have the user's email in our database, we will check if they entered the right password. We're accessing bcrypt.compareSync method from the User model.
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password the user entered didn't match our hashed, saved password, we'll tell the user that they made an error and it was a bad request, 400.
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If we had the user's email saved, and the user entered the correct password, we'll give their session a user_id and a logged_in of true
    req.session.save(() => {
      // userData.id will be the id already saved in the database for the user
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, session: req.session, message: 'You are now logged in!' });
    });

  } catch (err) {
    // 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error.
    console.error(err);
    res.status(400).json(err);
  }
});

// Post route to http://localhost:3001/api/users/logout for logging out. If the user was logged in, their session will be destroyed, and a 204 status code will be sent, which means that the server has successfully fulfilled the request and that there is no additional content to send in the response payload body.
// When the 204 No Content status code is received, it is in HTTP response to a HTTP operation such as a POST, PUT, or DELETE, where no message body is expected. 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Otherwise, if a post request to the /users/logout endpoint is received, but the user is not logged in, we will respond with a 404 status, meaning we couldn't find the requested resource, as there was no session for us to destroy.
    res.status(404).end();
  }
});

module.exports = router;
