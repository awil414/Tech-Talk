const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../utils/auth');

// GET all categories & their associated products
router.get('/', async (req, res) => {
    try {
      const postData =  await Post.findAll( 
        {
            attributes: ['id','title','post_body'],
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
      })
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });