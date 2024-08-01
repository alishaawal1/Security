import React, { useState } from 'react';
import '../style/cakes.css'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming you have a CartContext

// Define your bagel images (assuming you have these imports correctly set up)
import bagel1 from '../images/bagel1.jpeg';
import bagel2 from '../images/bagel2.jpeg';
import bagel3 from '../images/bagle3.jpeg';
import bagel4 from '../images/bagel4.jpeg';
import bagel5 from '../images/bagle5.jpeg';

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
      <button onClick={onAddToCart}>Add to cart</button>
      <button onClick={onBuyNow}>Buy now</button>
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
          onAddToCart={() => onAddToCart(cake)}
          onBuyNow={() => onBuyNow(cake)}
        />
      ))}
    </div>
  </div>
);

const Bagel = () => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const bagel = [
    { id: 1, image: bagel1, name: 'Strawberry', price: '1045' },
    { id: 2, image: bagel2, name: 'Vanilla', price: '1045' },
    { id: 3, image: bagel3, name: 'Rainbow', price: '1045' },
    { id: 4, image: bagel4, name: 'Cheese', price: '1045' },
    { id: 5, image: bagel5, name: 'Pineapple', price: '1045' },
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
        title="Bagel"
        cakes={bagel}
        onClickCake={handleClickCake}
        onAddToCart={handleAddToCartClick}
        onBuyNow={handleBuyNowClick}
      />
      {selectedCake && currentPage === 'catalog' && (
        <CakeModal
          cake={selectedCake}
          onClose={() => setSelectedCake(null)}
          onAddToCart={() => handleAddToCartClick(selectedCake)}
          onBuyNow={() => handleBuyNowClick(selectedCake)}
        />
      )}
    </div>
  );
};

export default Bagel;
