// Import necessary packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model
class Comment extends Model {}

// Initialize the Comment model with its attributes and options
Comment.init({
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
});

// Export the Comment model
module.exports = Comment;