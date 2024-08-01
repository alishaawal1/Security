import React from 'react';
import '../style/faq.css'; // Import your CSS file for AboutUsPage styling

const Faq = () => {
  return (
   
      <div className="faq-section">
        <h1>Frequently Asked Questions</h1>
        <div className="faq">
          <h2>1. Do you offer custom cakes?</h2>
          <p>Yes, we offer a variety of custom cakes to meet your needs. You can choose the flavor, design, and decorations to match your event.</p>
        </div>
        <div className="faq">
          <h2>2. How far in advance should I place my order?</h2>
          <p>We recommend placing your order at least one week in advance to ensure availability. For larger or more complex orders, please allow more time.</p>
        </div>
        <div className="faq">
          <h2>3. Do you offer delivery services?</h2>
          <p>Yes, we offer delivery services within the local area. Delivery fees may apply depending on the distance.</p>
        </div>
        <div className="faq">
          <h2>4. What are your payment options?</h2>
          <p>We accept various payment options including credit/debit cards, PayPal, and cash on delivery for local orders.</p>
        </div>
        <div className="faq">
          <h2>5. Can I make changes to my order after it has been placed?</h2>
          <p>We understand that plans can change. Please contact us as soon as possible to make any changes to your order. Changes may not be possible if the order is already in progress.</p>
        </div>
      </div>

  );
};

export default Faq;
