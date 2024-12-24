const { Sequelize, DataTypes } = require("sequelize");

// Set up Sequelize connection
// const sequelize = new Sequelize({
//   dialect: 'sqlite', // or 'mysql', 'postgres', etc.
//   storage: './database.sqlite' // or your database connection config
// });
// Initialize Sequelize with MySQL database
const sequelize = new Sequelize(process.env.MY_SQL_DBNAME, process.env.MY_SQL_USERNAME, process.env.MY_SQL_PASS, {
  host: process.env.MY_SQL_HOST,
  port: 3306,
  dialect: 'mysql', // Use MySQL dialect
});
// Import models
const Campaign = require('./models/Campaign')(sequelize, DataTypes);
// console.log(Campaign);
// // Sync the database (create tables)
// sequelize.sync()
//   .then(() => console.log('Database synced'))
//   .catch(err => console.log('Error syncing database:', err));

module.exports = sequelize;
