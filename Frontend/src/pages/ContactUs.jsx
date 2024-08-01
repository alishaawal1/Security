import React, { useState } from 'react';
import '../style/Contact.css';
import contact from '../images/ContactUs.jpeg';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add your logic here to handle the form submission, e.g., sending data to the server

    // Reset the form fields after submission
    setFullName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-us">
      <div className="image-contact">
        <img src={contact} alt="Contact Us" />
      </div>
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
