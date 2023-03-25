// Import necessary packages and modules
const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../util/auth.js');

// Get all blogs and associated users/comments
router.get('/', (req, res) => {
    Blog.findAll({ include: [User, Comment] })
        .then(dbBlogs => {
            res.json(dbBlogs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Get one blog with associated user and comment
router.get('/:id', (req, res) => {
    Blog.findByPk(req.params.id, { include: [User, Comment] })
        .then(dbBlog => {
            res.json(dbBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Create new blog post
router.post('/', (req, res) => {
    // Check for logged in user
    // If no user in session, send message
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login!' });
    }

    // Create blog post with title and content input by user; user id from session data
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    })
    // Date is "createdAt"
        .then(newBlog => {
            res.json(newBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Update post - withAuth fx 
router.put('/:id', withAuth, (req, res) => {
    Blog.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(updatedBlog => {
            res.json(updatedBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(delBlog => {
            res.json(delBlog);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Export router
module.exports = router;