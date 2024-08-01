import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { requestPasswordResetApi } from '../apis/Api'; // API function to request password reset

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        requestPasswordResetApi({ email })
            .then((res) => {
                if (res.data.success) {
                    toast.success('Password reset link sent to your email');
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
        <div className="password-reset-request">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your email address:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;
