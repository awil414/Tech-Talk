// const sequelize = require('../config/connection');  ???
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET /dashboard all POSTS & their associated Comments
router.get('/', async (req, res) => {
    try {
      const postData =  await PostData.findAll( 
        {
            where: {
                // use session ID
                user_id: req.session.user_id
            },
            attributes: ['id','title','post_body', ],
            include: [{ 
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: { 
                    model: User, 
                    attributes: ['user_name']
                }
            },
                {
                model: User,
                attributes: ['user_name']
                },
            ]
        });

        // Serialize data for template to read
        const posts = postData.map(post => post.get({ plain: true })); //plural on post??

        // Pass serialized data with sessions into template
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });