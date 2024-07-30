const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    is_verified: {
        type: Number,
        default: 0,
    },
    avatar: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    passwordChangedAt: {
        type: Date,
        default: Date.now,
    },
    passwordHistory: [{
        password: String,
        changedAt: Date
    }],
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    lockUntil: {
        type: Date,
        default: null,
    }
});

// Pre-save middleware to hash password and update password history
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        this.passwordChangedAt = Date.now();
        this.passwordHistory.push({ password: this.password, changedAt: this.passwordChangedAt });

        if (this.passwordHistory.length > 5) {
            this.passwordHistory.shift();
        }
    }
    next();
});

// Method to check if password is expired
userSchema.methods.isPasswordExpired = function () {
    const expiryDate = new Date(this.passwordChangedAt);
    expiryDate.setDate(expiryDate.getDate() + 90); 
    return Date.now() > expiryDate;
};

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Method to check if the new password is in the history
userSchema.methods.isPasswordInHistory = async function(newPassword) {
    for (let i = 0; i < this.passwordHistory.length; i++) {
        const match = await bcrypt.compare(newPassword, this.passwordHistory[i].password);
        if (match) return true;
    }
    return false;
};

// Method to generate reset password token
userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Method to increment login attempts
userSchema.methods.incrementLoginAttempts = async function () {
    if (this.lockUntil && this.lockUntil > Date.now()) {
        return;
    }

    this.failedLoginAttempts += 1;

    if (this.failedLoginAttempts >= 5) {
        this.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
    }

    await this.save();
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = async function () {
    this.failedLoginAttempts = 0;
    this.lockUntil = null;
    await this.save();
};

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
