const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await post.create({
      ...post,
    });
  }
  for (const comment of commentData) {
    await comment.create({
      ...comment,
    });
  }
  

  process.exit(0);
};

seedDatabase();
