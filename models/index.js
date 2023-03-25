// Import necessary models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// Define the relationships between the models
User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comment);
Comment.belongsTo(Blog);

User.hasMany(Comment);
Comment.belongsTo(User);

// Export the models
module.exports = {
    User,
    Blog,
    Comment
};