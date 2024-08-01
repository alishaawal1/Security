import React, { useState } from 'react';
import '../style/cakes.css'; // Adjust path as per your project structure
import {  useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; // Assuming you have a CartContext

// Define your cake images (assuming you have these imports correctly set up)
import cakeImage1 from '../images/strawberry.jpeg';
import cakeImage2 from '../images/vanilla.jpeg';
import cakeImage3 from '../images/rainbow.jpeg';
import cakeImage4 from '../images/cheese.jpeg';
import cakeImage5 from '../images/pineapple.jpeg';
import cakeImage6 from '../images/fruit.jpeg';
import cakeImage7 from '../images/wedding1.jpeg';
import cakeImage8 from '../images/wedding2.jpeg';
import cakeImage9 from '../images/wedding3.jpeg';
import cakeImage10 from '../images/wedding4.jpeg';
import cakeImage11 from '../images/wedding5.jpeg';
import cakeImage12 from '../images/wedding6.jpeg';
import cakeImage13 from '../images/tall1.jpeg';
import cakeImage14 from '../images/tall2.jpeg';
import cakeImage15 from '../images/tall3.jpeg';
import cakeImage16 from '../images/tall4.jpeg';
import cakeImage17 from '../images/tall5.jpeg';
import cakeImage18 from '../images/tall6.jpeg';
import cakeImage19 from '../images/cake7.jpeg';
import cakeImage20 from '../images/cake8.jpeg';
import cakeImage21 from '../images/wedding7.jpeg';
import cakeImage22 from '../images/wedding8.jpeg';
import cakeImage23 from '../images/tall7.jpeg';
import cakeImage24 from '../images/tall8.jpeg';
import AddToCartPage from './AddToCartPage';
import BuyNowPage from './BuyNowPage';

const CakeModal = ({ cake, onClose, onAddToCart, onBuyNow }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{cake.name}</h2>
      <img src={cake.image} alt={cake.name} className="modal-image" />
      <p>{cake.description}</p>
      <p className="modal-price">Price: Rs {cake.price} per pound</p>
      <div className="modal-buttons">
        <button onClick={onAddToCart}>Add to Cart</button>
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
      Per pound <span className="price">Rs {cake.price}</span>
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

const Cakes = () => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  const handleClickCake = (cake) => {
    setSelectedCake(cake);
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
        title="Birthday Cakes"
        cakes={[
          { id: 1, image: cakeImage1, name: 'Strawberry', price: '1045' },
          { id: 2, image: cakeImage2, name: 'Vanilla', price: '1045' },
          { id: 3, image: cakeImage3, name: 'Rainbow', price: '1045' },
          { id: 4, image: cakeImage4, name: 'Cheese', price: '1045' },
          { id: 5, image: cakeImage5, name: 'Pineapple', price: '1045' },
          { id: 6, image: cakeImage6, name: 'Fruit', price: '1045' },
          { id: 19, image: cakeImage19, name: 'Fruit', price: '1045' },
          { id: 20, image: cakeImage20, name: 'Fruit', price: '1045' },
        ]}
        onClickCake={handleClickCake}
        onAddToCart={handleAddToCartClick}
        onBuyNow={handleBuyNowClick}
      />
      <CakeSection
        title="Wedding Cakes"
        cakes={[
          { id: 7, image: cakeImage7, name: 'Purple Cake', price: '1045' },
          { id: 8, image: cakeImage8, name: 'Purple Cake', price: '1045' },
          { id: 9, image: cakeImage9, name: 'Purple Cake', price: '1045' },
          { id: 10, image: cakeImage10, name: 'Purple Cake', price: '1045' },
          { id: 11, image: cakeImage11, name: 'Purple Cake', price: '1045' },
          { id: 12, image: cakeImage12, name: 'Purple Cake', price: '1045' },
          { id: 21, image: cakeImage21, name: 'Fruit', price: '1045' },
          { id: 22, image: cakeImage22, name: 'Fruit', price: '1045' },
        ]}
        onClickCake={handleClickCake}
        onAddToCart={handleAddToCartClick}
        onBuyNow={handleBuyNowClick}
      />
      <CakeSection
        title="Tall Cakes"
        cakes={[
          { id: 13, image: cakeImage13, name: 'Purple Cake', price: '1045' },
          { id: 14, image: cakeImage14, name: 'Purple Cake', price: '1045' },
          { id: 15, image: cakeImage15, name: 'Purple Cake', price: '1045' },
          { id: 16, image: cakeImage16, name: 'Purple Cake', price: '1045' },
          { id: 17, image: cakeImage17, name: 'Purple Cake', price: '1045' },
          { id: 18, image: cakeImage18, name: 'Purple Cake', price: '1045' },
          { id: 23, image: cakeImage23, name: 'Fruit', price: '1045' },
          { id: 24, image: cakeImage24, name: 'Fruit', price: '1045' },
        ]}
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

export default Cakes;
