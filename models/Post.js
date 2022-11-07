const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
  {
    // Defines columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    post_title: {
      type: DataTypes.STRING,
      allowNull: false, 
  },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  },

);

module.exports = Post;
