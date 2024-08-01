import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';
import logoImage from '../images/Logo.png'; // Adjust the path as needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="need-assistance">
          <h3>Need Assistance?</h3>
          <div className="email-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Send Email</button>
          </div>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <Link to='/home' img src={logoImage} alt="BakeHub Logo" className="footer-logo"/>
          <h2>BakeHub</h2>
          <p>Trusted Bakery in Town.</p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Information</h4>
            <ul>
              <li><Link to="/terms">Terms and Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><i className="fas fa-home"></i> Bhaktapur, Nepal</p>
          <p><i className="fas fa-phone"></i> +977 9840000000</p>
          <div className="social-icons">
         
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Terms | Privacy | CCPA | Copyright | Legal | © BakeHub</p>
      </div>
    </footer>
  );
};

export default Footer;