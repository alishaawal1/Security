// importing
const router = require('express').Router();
const userControllers = require('../controllers/userController');
const rateLimit = require('express-rate-limit');
 
// Rate Limiting
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again after 15 minutes"
});
 
router.post('/create', userControllers.createUser)
 
router.get('/logs', userControllers.getLogs);
 
router.post('/login', userControllers.loginUser)
 
router.get("/verify/:id", userControllers.verifyMail);
 
 
router.post("/forgot", userControllers.forgotPassword);
router.put("/password/reset/:token", userControllers.resetPassword);
 
// export
module.exports = router;