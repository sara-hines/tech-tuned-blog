const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;


// Or, should I use the below? What is the difference between process.env.DB_URL and process.env.DB_HOST, and what would examples of a DB_URL and DB_HOST be, and why would you use one over the other in different situations? What else would have to change if you change whether you're using DB_URL or DB_HOST? What does all of this have to do with Render deployment?

// const Sequelize = require('sequelize');
// require('dotenv').config();

// const sequelize = process.env.DB_HOST
//   ? new Sequelize(process.env.DB_HOST)
//   : new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'postgres',
//     }
//   );

// module.exports = sequelize;

