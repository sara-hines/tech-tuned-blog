const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Post route to http://localhost:3001/api/blogs for when the user creates a blog post 
// Doing the withAuth first: we will only allow a user to access this route if they're logged in. If user is not logged in, we'll redirect them to http://localhost:3001/login
router.post('/', withAuth, async (req, res) => {
  try {
    // If the user made it past withAuth, we will create a new blog post with whatever is in the req.body (which needs to be the title and content--all the other Blog columns should be automatically generated or pulled from another model). user_id is the foreign key on Blog which references User(id). We will set user_id to be the user_id that was created on the session object. WHEN WOULD A user_id HAVE BEEN CREATED ON THE SESSION OBJECT? After a user first signs up, I believe, which would be facilitated by the post route to http://localhost:3001/api/users. And, when a user tries to log in, which would be facilitated by the post route to http://localhost:3001/api/users/login .
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete route to http://localhost:3001/api/blogs/:id for the user to delete a particular blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        // It will check if the user_id of the user that created the blog is the same as the user_id of the user that is currently logged in. We don't a user to be able to delete other users' blog posts.
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Put route to http://localhost:3001/api/blogs/:id to update a blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // The 1st obj we need to pass to .update() is the data we want to be added, and the 2nd obj we need to pass is a sort of options object with our condition
    const blogData = await Blog.update(
      // When we say to just take the req.body as the data for the update, we're passing off the responsibility for getting the right data to the frontend. So, on the frontend, make sure that I'm passing a title and content for the Blog post.
      {
        ...req.body
      },
      {
        where: {
          // The id of the blog post to be deleted
          id: req.params.id,
          // the user_id of the user that created the blog post, which has to match the user_id of the user currently logged in, so that the only the user who created the blog post can update it.
          user_id: req.session.user_id,
      },
    });

    // If we weren't able to get blogData back successfully (maybe a blog post with that id didn't exist, or maybe the user was trying to update someone else's blog post, etc)
    if (!blogData) {
      // Then we will respond that we weren't able to find the resource
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    // If all goes well, we'll respond with a 200 response
    res.status(200).json(blogData);
  } catch (err) {
    // Server error, if an error is caught here
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
