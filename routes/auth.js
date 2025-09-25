const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/signup', registerUser);  // Signup Route
router.post('/login', loginUser);      // Login Route
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
