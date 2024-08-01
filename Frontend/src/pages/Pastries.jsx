import React, { useState } from 'react';
import '../style/cakes.css'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming you have a CartContext

// Define your pastry images (assuming you have these imports correctly set up)

import p1 from '../images/p1.jpeg';
import p2 from '../images/p2.jpeg';
import p3 from '../images/p3.jpeg';
import p4 from '../images/p4.jpeg';
import p5 from '../images/p5.jpeg';
import p6 from '../images/p6.jpeg';
import p7 from '../images/p7.jpeg';
import p8 from '../images/p8.jpeg';
import p9 from '../images/p9.jpeg';
import p10 from '../images/p10.jpeg';
import p11 from '../images/p11.jpeg';
import p12 from '../images/p12.jpeg';
import p13 from '../images/p13.jpeg';

import AddToCartPage from './AddToCartPage';
import BuyNowPage from './BuyNowPage';

const CakeModal = ({ cake, onClose, onAddToCart, onBuyNow }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{cake.name}</h2>
      <img src={cake.image} alt={cake.name} className="modal-image" />
      <p>{cake.description}</p>
      <p className="modal-price">Price: Rs {cake.price} per piece</p>
      <div className="modal-buttons">
        <button onClick={() => onAddToCart(cake)}>Add to Cart</button>
        <button onClick={onBuyNow}>Buy Now</button>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

const CakeCard = ({ cake, onClickCake, onAddToCart, onBuyNow }) => (
  <div className="cake-card">
    <div className="clickable" onClick={() => onClickCake(cake)}>
      <img src={cake.image} alt={cake.name} className="cake-image" />
      <h3>{cake.name}</h3>
    </div>
    <p className="price-info">
      Per piece <span className="price">Rs {cake.price}</span>
    </p>
    <div className="button-group">
      <button className="add-to-cart" onClick={() => onAddToCart(cake)}>
        Add to cart
      </button>
      <button className="buy-now" onClick={() => onBuyNow(cake)}>Buy Now</button>
    </div>
  </div>
);

const CakeSection = ({ title, cakes, onClickCake, onAddToCart, onBuyNow }) => (
  <div className="cake-section">
    <h2>{title}</h2>
    <div className="cake-grid">
      {cakes.map((cake, index) => (
        <CakeCard
          key={index}
          cake={cake}
          onClickCake={onClickCake}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  </div>
);

const Pastries = () => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const pastries = [
    { id: 1, image: p1, name: 'Strawberry', price: '203' },
    { id: 2, image: p2, name: 'Vanilla', price: '105' },
    { id: 3, image: p3, name: 'Rainbow', price: '105' },
    { id: 4, image: p4, name: 'Cheese', price: '105' },
    { id: 5, image: p5, name: 'Pineapple', price: '145' },
    { id: 6, image: p6, name: 'Vanilla', price: '190' },
    { id: 7, image: p7, name: 'Rainbow', price: '245' },
    { id: 8, image: p8, name: 'Cheese', price: '125' },
    { id: 9, image: p9, name: 'Pineapple', price: '145' },
    { id: 10, image: p10, name: 'Strawberry', price: '75' },
    { id: 11, image: p11, name: 'Vanilla', price: '105' },
    { id: 12, image: p12, name: 'Rainbow', price: '105' },
    { id: 13, image: p13, name: 'Cheese', price: '145' },
  ];

  const handleClickCake = (cake) => {
    setSelectedCake(cake);
  };

  const handleAddToCartClick = (cake) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      addToCart(cake);
      navigate('/cart');
    }
  };

  const handleBuyNowClick = (cake) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/cakes/${cake.id}/buynow`);
    }
  };

  const handleBackToCatalog = () => {
    setCurrentPage('catalog');
    setSelectedCake(null);
  };

  if (currentPage === 'addToCart') {
    return <AddToCartPage cake={selectedCake} onBack={handleBackToCatalog} />;
  }

  if (currentPage === 'buyNow') {
    return <BuyNowPage cake={selectedCake} />;
  }

  return (
    <div className="cakes-catalog">
      <CakeSection
        title="Pastries"
        cakes={pastries}
        onClickCake={handleClickCake}
        onAddToCart={handleAddToCartClick}
        onBuyNow={handleBuyNowClick}
      />
      {selectedCake && currentPage === 'catalog' && (
        <CakeModal
          cake={selectedCake}
          onClose={() => setSelectedCake(null)}
          onAddToCart={handleAddToCartClick}
          onBuyNow={handleBuyNowClick}
        />
      )}
    </div>
  );
};

export default Pastries;
