import React from 'react';
import '../style/Aboutus.css'; // Import your CSS file for AboutUsPage styling
import aboutus from '../images/AboutUs.jpg';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="content">
        <div className="text-content">
        
          <section className="mission">
            <h2>Our Mission</h2>
            <p>Our mission is to create the most delicious and beautiful cakes for every occasion, bringing joy and happiness to our customers.</p>
          </section>
          <section className="vision">
            <h2>Our Vision</h2>
            <p>We aim to be the leading cake shop in the region, known for our quality, creativity, and customer satisfaction.</p>
          </section>
          <section className="history">
            <h2>Our History</h2>
            <p>Founded in 2010, we have been serving our community with passion and dedication. Over the years, we have grown from a small bakery to a renowned cake shop.</p>
          </section>
        </div>
        <div className="image-content">
          <img src={aboutus} alt="About Us" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
