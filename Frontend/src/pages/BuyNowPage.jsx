import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext'; // Adjust import based on your actual path
import '../style/buynow.css'; 
import strawberryImage from '../images/strawberry.jpeg';
import vanillaImage from '../images/vanilla.jpeg';
import chocolateImage from '../images/chocolate.jpeg';
import pineappleImage from '../images/pineapple.jpeg';
import fruitImage from '../images/fruit.jpeg';
import rainbowImage from '../images/rainbow.jpeg';

// Sample cake data (replace with your actual data or import from a data source)
const cakes = [
  {
    id: 1,
    image: strawberryImage,
    name: 'Strawberry Cake',
    description: 'Delicious strawberry flavored cake',
    price: 1045, // Price per pound
  },
  {
    id: 2,
    image: vanillaImage,
    name: 'Vanilla Cake',
    description: 'Classic vanilla cake with creamy frosting',
    price: 950,
  },
  {
    id: 3,
    image: pineappleImage,
    name: 'Pineapple Cake',
    description: 'Refreshing pineapple flavored cake',
    price: 900,
  },
  {
    id: 4,
    image: fruitImage,
    name: 'Fruit Cake',
    description: 'Fruit cake with mixed fruits',
    price: 1200,
  },
  {
    id: 5,
    image: chocolateImage,
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake',
    price: 1100,
  },
  {
    id: 6,
    image: rainbowImage,
    name: 'Rainbow Cake',
    description: 'Colorful rainbow cake',
    price: 1300,
  },
];

const BuyNowPage = () => {
  const { id } = useParams(); // Assuming your route provides the ID, e.g., /cakes/1
  const { addToCart } = useCart(); // Assuming you have a CartContext to manage cart functionality

  // Find the cake with the provided ID
  const selectedCake = cakes.find(cake => cake.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [flavor, setFlavor] = useState('');
  const [accessories, setAccessories] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [dateError, setDateError] = useState('');

  const handleAddToCart = () => {
    const item = {
      ...selectedCake,
      quantity,
      message,
      flavor,
      accessories,
      deliveryDate,
    };
    addToCart(item);
    alert('The cake is added to cart!');
  };

  const handleBuyNow = () => {
    // Validate delivery date before proceeding
    if (validateDate(deliveryDate)) {
      handleAddToCart(); // Example: Add to cart before redirecting
      // Redirect to cart or checkout page
    } else {
      setDateError('Please select a valid delivery date.');
    }
  };

  const handleQuantityChange = (operation) => {
    if (operation === 'increment') {
      setQuantity(quantity + 1);
    } else if (operation === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setDeliveryDate(date);
    if (!validateDate(date)) {
      setDateError('Please select a valid delivery date.');
    } else {
      setDateError('');
    }
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    const maxDate = new Date(currentDate);
    maxDate.setDate(currentDate.getDate() + 14); // Two weeks from today
    return selectedDate >= currentDate && selectedDate <= maxDate;
  };

  return (
    <div className="buynow-container">
      <div className="top-content">
        <div className="cake-image-container">
          <img src={process.env.PUBLIC_URL + selectedCake.image} alt={selectedCake.name} className="cake-image" />
        </div>
        <div className="cake-info">
          <h1>{selectedCake.name}</h1>
          <p>{selectedCake.description}</p>
          <p className="price">Price per pound: Rs {selectedCake.price}</p>
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange('decrement')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('increment')}>+</button>
          </div>
          <div className="total-price">
            <strong>Total Price: Rs {selectedCake.price * quantity}</strong>
          </div>
          <div className="delivery-date">
            <label>Delivery Date:</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]} // Set minimum date to today
            />
            {dateError && <p className="error">{dateError}</p>}
          </div>
        </div>
      </div>
      <div className="bottom-content">
        <div className="message-section">
          <label>Message on Cake:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="dropdown-section">
          <div className="flavor">
            <label>Flavor:</label>
            <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
              <option value="">Select Flavor</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Vanilla">Vanilla</option>
              <option value="Strawberry">Strawberry</option>
            </select>
          </div>
          <div className="accessories">
            <label>Accessories:</label>
            <select
              multiple
              value={accessories}
              onChange={(e) => setAccessories(Array.from(e.target.selectedOptions, option => option.value))}
            >
              <option value="Sprinkles">Sprinkles</option>
              <option value="Candles">Candles</option>
              <option value="Chocolate Drizzle">Chocolate Drizzle</option>
            </select>
            <div className="selected-accessories">
              {accessories.length > 0 && (
                <p>Selected Accessories: {accessories.join(', ')}</p>
              )}
            </div>
          </div>
        </div>
        <div className="actions">
          <Link to="/cart" className="buy-now" onClick={handleBuyNow}>
            Buy Now
          </Link>
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
