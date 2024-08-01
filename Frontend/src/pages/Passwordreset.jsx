import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPasswordApi } from '../apis/Api';
import '../style/PasswordReset.css'; // Adjust path as per your project structure

const PasswordReset = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        resetPasswordApi(token, { password })
            .then((res) => {
                if (res.data.success) {
                    toast.success('Password has been reset successfully');
                    navigate('/login');
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error('Server Error');
                console.error(err);
            });
    };

    return (
        <div className="password-reset-container">
            <div className="password-reset">
                <h2>Reset Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordReset;
