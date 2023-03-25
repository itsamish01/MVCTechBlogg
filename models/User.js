// Import necessary packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Define the User model
class User extends Model {}

// Initialize the User model with its attributes and options
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
}, {
    hooks: {
        beforeCreate: async (userdata) => {
            userdata.password = await bcrypt.hash(userdata.password, 5);
            return userdata;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
});

// Export the User model
module.exports = User;