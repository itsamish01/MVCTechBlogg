// Import necessary packages and modules
const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models');

// Get all comments and associated users/blogs
router.get('/', (req, res) => {
    Comment.findAll({ include: [User, Blog] })
        .then(dbComments => {
            res.json(dbComments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Get one comment with associated user and blog
router.get('/:id', (req, res) => {
    Comment.findByPk(req.params.id, { include: [User, Blog] })
        .then(dbComment => {
            res.json(dbComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Create new comment
router.post('/', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login first!' });
    }
    Comment.create({
        body: req.body.body,
        userId: req.session.user.id,
        blogId: req.body.blogId
    })
        .then(newComment => {
            res.json(newComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Update comment
router.put('/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login first!' });
    }
    // TODO: Ensure user updating is original author
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(updatedComment => {
            res.json(updatedComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Delete comment
router.delete('/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login first!' });
    }
    // TODO: Ensure user deleting is original author
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(delComment => {
            res.json(delComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Export router
module.exports = router;