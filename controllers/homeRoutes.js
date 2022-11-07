// const sequelize = require('../config/connection');  ???
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all POSTS & their associated Comments
router.get('/', async (req, res) => {
  try {
    const postData = await PostData.findAll({
      attributes: ['id', 'title', 'post_body'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['user_name'],
          },
        },
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    // Serialize data for template to read
    const posts = postData.map((post) => post.get({ plain: true })); //plural on post??

    // Pass serialized data with sessions into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }], // Model USER?????????
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login form
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// GET signup form
router.get('/signup', (req, res) => {
  // If user already has an account ??????????????????????
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

// GET one post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await PostData.findOne(req.params.id, {
      include: [
        {
          model: User,
          // attributes: ['user_name'], DO I NEED THIS??????
          model: Comment, // do I need attributes????????????
        },
      ],
    });
    // Serialize the data
    const post = postData.get({ plain: true });
    // Pass data to template
    res.render('single-post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
