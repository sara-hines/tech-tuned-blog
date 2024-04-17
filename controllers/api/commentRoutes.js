const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Post route to http://localhost:3001/api/comments for the user to create a comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // On the frontend, I need to make sure that I pass the content for the comment, which will be pulled from an HTML input element, and the blog_id, which is a foreign key on the Comment model referencing Blog(id) (so that we can associate the comment with the blogpost the comment is supposed to be on). HOW WILL I OBTAIN THE blog_id SO THAT IT CAN BE SAVED AS A REQUIRED VALUE FOR MAKING A NEW COMMENT? PROBABLY BY SOMEHOW GRABBING THE BLOG ID AS A PARAMETER FROM THE URL. But how would I access it here?
      ...req.body,
      // The user_id is automatic because it's saved in the session. We don't have to pass the user_id from the frontend or anything.
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete route to http://localhost:3001/api/comments/:id for the user to delete a particular comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Put route to http://localhost:3001/api/comments/:id for the user to update a particular comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        ...req.body
      },
      {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
