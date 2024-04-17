const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const { blogRandomDate, commentRandomDate } = require('../utils/helpers.js');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    }); 

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            date_created: blogRandomDate(),
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            date_created: commentRandomDate(),
        });
    }
    process.exit(0);
};

seedDatabase();
