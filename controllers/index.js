const express = require('express');
const router = express.Router();

// Import API routes
const userRoutes = require("./api/userRoutes.js");
const blogRoutes = require("./api/blogRoutes");
const commentRoutes = require("./api/commentRoutes");

// Mount API routes
router.use("/api/users", userRoutes);
router.use("/api/blogs", blogRoutes);
router.use("/api/comments", commentRoutes);

// Import and mount front-end routes
const frontEnd = require("./frontendRoutes");
router.use("/", frontEnd);

// Route to show session data (for debugging purposes)
router.get("/showsessions", (req, res) => {
  res.json(req.session);
});

module.exports = router;