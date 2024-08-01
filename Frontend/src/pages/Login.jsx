import React, { useState } from 'react';
import { loginUserApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        loginUserApi(data)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                    localStorage.setItem('token', res.data.token);
                    navigate('/admin/dashboard');

                    const jsonDecode = JSON.stringify(res.data.userData);
                    localStorage.setItem('user', jsonDecode);
                }
            })
            .catch(err => {
                toast.error("Server Error");
                console.log(err.message);
            });
    };

    return (
        <div className="login-container">
            <div className="left-content">
                <div className="background-image">
                    <img src="../images/Login.jpeg" alt="Login" />
                </div>
            </div>
            <div className="right-content">
                <div className="login-box">
                    <h1 className="login-heading">Login</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control mb-2"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control mb-2"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="mt-2 forgot-password">
                            <Link to="/passwordreset" className="btn btn-link" style={{ textDecoration: 'none', color: 'black' }}>
                                Forgot Password?
                            </Link>
                        </div>
                        
                        <button onClick={handleSubmit} className="login-button">Login</button>
                      
                    </form>
                    <div className="register-link">
                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
