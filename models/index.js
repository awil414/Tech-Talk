// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', 
  });

// Posts have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE', 
  });

// Comments belongsTo Post
Comment.belongsTo(Post, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});

// // Comment belongToMany Tags 
// Product.belongsToMany(Tag, {
//   // Define sthe third table needed to store the foreign keys
//   through: {
//     model: ProductTag,
//     unique: false  
//   },
//   // Defines a foreignKey for when data is retrieved
//   foreignKey: 'product_id' 
// });

// // Tags belongToMany Products 
// Tag.belongsToMany(Product, {
//   through: {
//     model: ProductTag,
//     unique: false
//   },
//   // foreignKey
//   foreignKey: 'tag_id'
// });


module.exports = { User, Post, Comment };
