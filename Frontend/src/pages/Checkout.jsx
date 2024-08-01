// CheckoutPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '.CartContext'; // Adjust the path as necessary
import '../style/checkout.css'; // Create and style this CSS file

const CheckoutPage = () => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="checkout-page">
      <h2>Order Summary</h2>
      <div className="cart-summary">
        {cart.map((cake, index) => (
          <div key={index} className="cart-item">
            <img src={cake.image} alt={cake.name} className="cart-image" />
            <div className="cart-details">
              <h3>{cake.name}</h3>
              <p>Quantity: {cake.quantity}</p>
              <p>Flavor: {cake.flavor}</p>
              <p>Accessories: {cake.accessories ? cake.accessories.join(', ') : 'None'}</p>
              <p>Delivery Date: {cake.deliveryDate}</p>
            </div>
            <button className="delete-icon" onClick={() => removeFromCart(cake)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="checkout-content">
        <div className="left-container">
          <h3>Delivery Details</h3>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <label htmlFor="country">Country</label>
            <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} required>
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Nepal">Nepal</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
              <option value="Australia">Australia</option>
            </select>

            <button type="submit" className="buy-now-button" onClick={() => setPaymentMethod('open')}>Buy Now</button>
          </form>
        </div>
        <div className="right-container">
          <h3>Total Price</h3>
          <p>Rs {totalPrice}</p>
        </div>
      </div>
      {paymentMethod === 'open' && (
        <div className="payment-popup">
          <h3>Select Payment Method</h3>
          <button onClick={() => setPaymentMethod('COD')}>Cash on Delivery</button>
          <button onClick={() => setPaymentMethod('QR')}>QR Code</button>
          <button onClick={() => setPaymentMethod('Bank')}>Bank Transfer</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
