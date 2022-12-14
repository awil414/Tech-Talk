// const sequelize = require('../config/connection');  ???
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET /dashboard all POSTS & their associated Comments and render dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await PostData.findAll({
      where: {
        // use session ID
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'post_body'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        // {
        //   model: User,
        //   attributes: ['username'],
        // },
      ],
    });

    // Serialize data for template to read
    const posts = postData.map((post) => post.get({ plain: true })); 

    // Pass serialized data with sessions into template
    res.render('dashboard', {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post by id to edit
router.get('/edit/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const postData = await PostData.findByPk(req.params.id);
    //  {
    //   include: [
    //     {
    //       model: User,
    //       // attributes: ['username'], DO I NEED THIS??????
    //       model: Comment, // do I need attributes????????????
    //     },
    //   ],
    // });
    // Serialize the data
    const post = postData.get({ plain: true });
    // Pass data to template
    res.render('edit', {
      post: post,
      // ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//   // DO I NEED ??????
//  router.get('/new', (req, res) => {
//     res.render('new-post');
//   });

module.exports = router;
