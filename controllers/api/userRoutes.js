// Import necessary packages and modules
const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models/');
const bcrypt = require('bcrypt');

// Get all users and associated blogs/comments
router.get('/', (req, res) => {
    User.findAll({
        include: [Blog, Comment]
    })
        .then(dbUsers => {
            res.json(dbUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Logout by hitting /api/users/logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Get one user with associated blogs/comments
router.get('/:id', (req, res) => {
    User.findByPk(req.params.id, { include: [Blog, Comment] })
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Sign up
router.post('/', (req, res) => {
    // Run hooks to hash and salt password; create user
    User.create(req.body, { individualHooks: true })
        .then(newUser => {
            // Create new session for user with id and username (sessions set to 30 min)
            req.session.user = {
                id: newUser.id,
                username: newUser.username
            };
            res.json(newUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Login
router.post('/login', (req, res) => {
    // Find user with matching username
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(foundUser => {
            // If username not found, send message
            if (!foundUser) {
                return res.status(400).json({ msg: 'Wrong login credentials' });
            }
            // Compare password with saved hash
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // If password matches, create session for user
                req.session.user = {
                    id: foundUser.id,
                    username: foundUser.username
                };
                return res.json(foundUser);
            } else {
                return res.status(400).json({ msg: 'Wrong login credentials' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        individualHooks: true
    })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(delUser => {
            res.json(delUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'An error occurred', err });
        });
});

// Export router
module.exports = router;