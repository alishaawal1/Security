const User = require('../models/userModel');

async function checkPasswordExpiry(req, res, next) {
    const user = await User.findById(req.user.id);

    if (user.isPasswordExpired()) {
        return res.status(403).json({ message: 'Your password has expired. Please reset your password.' });
    }

    next();
}

module.exports = { checkPasswordExpiry };
