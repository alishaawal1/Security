const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create User
const createUser = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields.",
        });
    }

    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists.",
            });
        }

        const newUser = new Users({
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            passwordChangedAt: Date.now(), // Set initial password change date
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User created successfully.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        });
    }

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist."
            });
        }

        if (user.lockUntil && user.lockUntil > Date.now()) {
            const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
            return res.status(403).json({
                success: false,
                message: `Your account is locked. Try again in ${minutesLeft} minutes.`
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            await user.incrementLoginAttempts();
            const attemptsLeft = 5 - user.failedLoginAttempts;
            if (attemptsLeft <= 0) {
                return res.status(403).json({
                    success: false,
                    message: 'Account locked due to too many failed login attempts. Please try again later.'
                });
            }
            return res.json({
                success: false,
                message: `Incorrect password. You have ${attemptsLeft} attempts left.`
            });
        }

        await user.resetLoginAttempts();

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: 'strict',
        });

        res.status(200).json({
            success: true,
            token: token,
            userData: user,
            message: "User logged in successfully."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

// Verify Email
const verifyMail = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.is_verified = 1;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // Create a reset URL
        const resetURL = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

        // Email message
        const message = `You requested a password reset. Please click the following link to reset your password: ${resetURL}`;

        // Send the email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'bakehub <bakehub@gmail.com>',
            to: user.email,
            subject: 'Password Reset',
            text: message,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Password reset token sent to email',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await Users.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Token is invalid or has expired' });
        }

        // Check if the new password matches any of the previous passwords
        if (await user.isPasswordInHistory(req.body.password)) {
            return res.status(400).json({ success: false, message: 'You cannot reuse a previous password. Please choose a different password.' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.passwordChangedAt = Date.now(); // Update the password change time
        await user.save();

        res.status(200).json({ success: true, message: 'Password has been reset' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
const getLogs = async (req, res) => {
    try {
      const logs = await mongoose.connection.db.collection('logs').find().toArray();
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };

module.exports = {
    createUser,
    loginUser,
    verifyMail,
    forgotPassword,
    resetPassword,
    getLogs,
};
