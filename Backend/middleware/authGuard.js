const jwt = require('jsonwebtoken');

// Middleware to protect routes that require general user authentication
const authGuard = (req, res, next) => {
    // Get authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header not found!"
        });
    }

    // Extract token from the header
    // Expected format: 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found!"
        });
    }

    try {
        // Verify token
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decodedUser; // Attach user data to the request object
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({
            success: false,
            message: "Invalid token!"
        });
    }
};

// Middleware to protect routes that require admin-level access
const authGuardAdmin = (req, res, next) => {
    // Get authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authorization header not found!"
        });
    }

    // Extract token from the header
    // Expected format: 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found!"
        });
    }

    try {
        // Verify token
        const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decodedUser; // Attach user data to the request object

        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Permission denied! Admin access required."
            });
        }

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({
            success: false,
            message: "Invalid token!"
        });
    }
};

// Middleware to allow only guest (non-authenticated) users to access specific routes
const guestGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            // If the token is valid, the user is authenticated, so deny access to guest routes
            jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            return res.status(403).json({
                success: false,
                message: "Access denied! Only guests can access this route."
            });
        } catch (error) {
            // If the token is invalid or expired, proceed as guest
            next();
        }
    } else {
        next(); // No token found, so the user is a guest
    }
};

module.exports = {
    authGuard,
    authGuardAdmin,
    guestGuard
};
