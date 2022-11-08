const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      // where: {
      //   // use session ID
      //   user_id: req.session.user_id,
      // },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
