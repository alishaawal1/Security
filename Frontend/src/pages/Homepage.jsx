import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  return (
    <div className="landing-container">
      <div className="top-content">
        <div className="top-left-container"> {/* Added container */}
          <div className="top-left-content">
            <h1>BakeHub</h1>
            <p>Trusted Bakery in Town.</p>
            <div className="buttons">
              <Link to="/login" className="login-button">Login</Link>
              <Link to="/register" className="register-button">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
