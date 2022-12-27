const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /post all POSTS & their associated Comments
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        // use session ID
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'post_body', 'created_at'],
      order:[
        ['created_at', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          // include: {
          //   model: User,
          //   attributes: ['username'],
          // },
        },
      ],
    });

    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /post FIND ONE and its associated Comments
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {

    // const post = postData.get({ plain:true });
    // {
      where: {
        // use session ID
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'post_body'],  // created_at?
      // order:[
      //   ['created_at', 'DESC']
      // ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    res.status(200).json(postData);
    // res.render('post', {
    //   ...post,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE (PUT) post
router.put('/:id', withAuth, async (req, res) => {
  // update post data
  try {
    const updatePost = await Post.update({
      ...req.body.title,
      ...req.body.post_body,
      user_id: req.session.user_id,
      id: req.params.id,
    });

    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DESTROY delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
