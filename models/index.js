// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
  });

// Posts belongs to User
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
  });

// Comments belongsTo User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Users have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
});

// Comments belong to Post 
Comment.belongsto(Post, {
  foreignKey: 'post_id'
});

// Posts have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE', 
});


module.exports = { User, Post, Comment };
