const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If a JawsDB URL is set, use it for the database connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Otherwise, use environment variables for database configuration
  sequelize = new Sequelize(
    process.env.DB_NAME, // Name of the database
    process.env.DB_USER, // Username for accessing the database
    process.env.DB_PASSWORD, // Password for accessing the database
    {
      host: 'localhost', // Hostname for the database server
      dialect: 'mysql', // Dialect for connecting to the database (in this case, MySQL)
      port: 3306 // Port number for the database server
    }
  );
}

module.exports = sequelize