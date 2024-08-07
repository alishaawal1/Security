const jwt = require('jsonwebtoken');

const guestGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (token) {
        try {
            const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = decodedUser;
        } catch (error) {
            console.error("Invalid token:", error);
            return res.status(403).json({
                success: false,
                message: "Invalid token. Access denied!"
            });
        }
    }

    // If there's no token, or if the token is invalid, treat as a guest
    next();
};

module.exports = guestGuard;
