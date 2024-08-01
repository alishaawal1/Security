import React, { useState } from 'react';
import '../style/cakes.css'; // Adjust path as per your project structure
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming you have a CartContext

// Define your donut images (assuming you have these imports correctly set up)
import donut1 from '../images/donut1.jpeg';
import donut2 from '../images/donut2.jpeg';
import donut3 from '../images/donut3.jpeg';
import donut4 from '../images/donut6.jpeg';
import donut5 from '../images/donut5.jpeg';

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

const Donut = () => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const donut = [
    { id: 1, image: donut1, name: 'Strawberry', price: '1045' },
    { id: 2, image: donut2, name: 'Vanilla', price: '1045' },
    { id: 3, image: donut3, name: 'Rainbow', price: '1045' },
    { id: 4, image: donut4, name: 'Cheese', price: '1045' },
    { id: 5, image: donut5, name: 'Pineapple', price: '1045' },
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
        title="Donut"
        cakes={donut}
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

export default Donut;
