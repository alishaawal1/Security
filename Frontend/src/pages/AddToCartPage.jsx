import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import '../style/addtocart.css'; // Adjust path as per your project structure

// Import the images for the payment methods
import cashImg from '../images/cod.jpeg';
import qrImg from '../images/qrcode.png';
import bankImg from '../images/bank.png';

const AddToCartPage = () => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [deliveryDateError, setDeliveryDateError] = useState('');

  const handleBuyNowClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    // Reset the form fields
    setFullName('');
    setAddress('');
    setCity('');
    setCountry('');
    setPaymentMethod('');
    setDeliveryDate('');
    setDeliveryDateError('');
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentMethod(method);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate delivery date
    const currentDate = new Date();
    const selectedDate = new Date(deliveryDate);
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);

    if (selectedDate < currentDate || selectedDate > twoWeeksFromNow) {
      setDeliveryDateError('Delivery date must be within the next two weeks.');
      return;
    }

    // Assuming the order is placed successfully
    setShowPopup(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    // Reset the form fields
    setFullName('');
    setAddress('');
    setCity('');
    setCountry('');
    setPaymentMethod('');
    setDeliveryDate('');
    setDeliveryDateError('');
  };

  return (
    <div className="cart-page">
      <h2>My Cart</h2>
      {cart.map((cake, index) => (
        <div key={index} className="cart-item">
          <div className="cart-image-container">
            <img src={cake.image} alt={cake.name} className="cart-image" />
          </div>
          <div className="cart-details">
            <h3>{cake.name}</h3>
            <p>Quantity: {cake.quantity}</p>
            <p>Flavor: {cake.flavor}</p>
            <p>Accessories: {cake.accessories ? cake.accessories.join(', ') : 'None'}</p>
            <p>Delivery Date: {cake.deliveryDate}</p>
          </div>
          <div className="cart-actions">
            <button className="delete-icon" onClick={() => removeFromCart(cake)}>Delete</button>
            <Link to={`/cakes/${cake.id}/buynow`}>
              <button className="buy-now-cart">Buy Now</button>
            </Link>
          </div>
        </div>
      ))}
      <div className="total-container">
        <p>Total Price: Rs {totalPrice}</p>
        <button className="buy-now-cart" onClick={handleBuyNowClick}>Buy Now</button>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup" onClick={handlePopupClose}>X</button>
            <h3>Select Payment Method</h3>
            <div className="payment-options">
              <img
                src={cashImg}
                alt="Cash on Delivery"
                onClick={() => handlePaymentMethodClick('Cash on Delivery')}
                className="payment-method-img"
              />
              <img
                src={qrImg}
                alt="QR Code"
                onClick={() => handlePaymentMethodClick('QR Code')}
                className="payment-method-img"
              />
              <img
                src={bankImg}
                alt="Bank Transfer"
                onClick={() => handlePaymentMethodClick('Bank Transfer')}
                className="payment-method-img"
              />
            </div>
            <div className="delivery-details">
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
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Nepal">Nepal</option>
                  <option value="UK">UK</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                </select>

                <label htmlFor="deliveryDate">Delivery Date</label>
                <input
                  type="date"
                  id="deliveryDate"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
                {deliveryDateError && <p className="error-message">{deliveryDateError}</p>}

                <button type="submit" className="submit-details">Place Order</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showToast && (
        <div className="toast">
          <p>Order placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
