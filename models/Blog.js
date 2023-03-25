// Import necessary packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Blog model
class Blog extends Model {}

// Initialize the Blog model with its attributes and options
Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog'
});

// Export the Blog model
module.exports = Blog;