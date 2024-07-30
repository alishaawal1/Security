const express = require('express');
const { changePassword } = require('../controllers/userController');
const { checkPasswordExpiry } = require('../middleware/authMiddleware');
const router = express.Router();

// Endpoint for resetting the password
router.post('/reset-password', checkPasswordExpiry, async (req, res) => {
    const { userId, newPassword } = req.body;

    try {
        await changePassword(userId, newPassword);
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
