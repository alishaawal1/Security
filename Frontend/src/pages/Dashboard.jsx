import React from 'react';
import {  useNavigate } from 'react-router-dom';
import '../style/Dashboard.css';
import mainImage from '../images/Dashboard.jpg';
import cupcakesImage from '../images/cupcakes.jpeg';
import weddingCakeImage from '../images/wedding.jpg';
import croissantsImage from '../images/croissant.jpeg';
import cookiesImage from '../images/cookies.jpeg';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleShopNowClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            navigate('/cakes');
        }
    };

    return (
        <div className="dashboard">
            <div className='bake'>
                <h1>BakeHub</h1>
                <p align='center'>The Best Bakery in Town</p>
            </div>

            <div className="main-image-container">
                <img src={mainImage} alt="Various baked goods" className="main-image" />
                <button onClick={handleShopNowClick} className="shop-now-btn">SHOP NOW</button>
            </div>

            <div className="featured-image-container">
                <div className="featured-items">
                    <div className='feature'>
                        <p>Featured Items</p>
                    </div>

                    {/* Cupcakes Section */}
                    <div className="featured-section">
                        <div className="featured-image left">
                            <img src={cupcakesImage} alt="Chocolate cupcakes" />
                        </div>
                        <div className="featured-text right cupcakes">
                            <p>
                                Our cake, delightful miniature treats, have long been a staple of celebrations and casual gatherings alike. With diminutive size and endless variety, cupcakes originated in the United States in the 19th century. The term "cupcake" was first mentioned in E. Leslie's "Receipts" cookbook in 1828. Traditionally, cupcakes were made using a standard measure of ingredients: one cup of butter, two cups of sugar, three cups of flour, and four eggs.
                            </p>
                        </div>
                    </div>

                    {/* Wedding Cake Section */}
                    <div className="featured-section reverse">
                        <div className="featured-image right">
                            <img src={weddingCakeImage} alt="Elegant wedding cake" />
                        </div>
                        <div className="featured-text left wedding-cake">
                            <p>
                                Wedding cakes are traditional centerpiece desserts, often multi-tiered and elaborately decorated, served at many weddings following a ceremony. They can be customized to reflect the couple's tastes and wedding theme, ranging from classic white designs to modern, themed creations. These cakes often feature intricate details, fillings, and decorations to make the wedding day a memorable and sweet celebration of love.Wedding cakes are not just desserts but also an integral part of the wedding tradition, often involved in ceremonial cake cutting that symbolizes the couple's first joint task and future cooperation.
                            </p>
                        </div>
                    </div>

                    {/* Croissants Section */}
                    <div className="featured-section">
                        <div className="featured-image left">
                            <img src={croissantsImage} alt="Fresh croissants" />
                        </div>
                        <div className="featured-text right croissants">
                            <p>
                                A croissant is a buttery, flaky pastry of Austrian origin, but largely associated with France. Crescent-shaped and made from layered yeast-leavened dough, croissants are created by laminating the dough with butter, then rolling and folding several times in succession. The result is a layered, flaky texture similar to that of puff pastry. Croissants are a staple of French bakeries and breakfast tables worldwide.
                            </p>
                        </div>
                    </div>

                    {/* Cookies Section */}
                    <div className="featured-section reverse">
                        <div className="featured-image right">
                            <img src={cookiesImage} alt="Chocolate chip cookies" />
                        </div>
                        <div className="featured-text left cookies">
                            <p>
                                A cookie is a baked or cooked snack or dessert that is typically small, flat, and sweet. It usually contains flour, sugar, and some type of oil or butter. It may include other ingredients such as raisins, oats, chocolate chips, or nuts. In most English-speaking countries except for the United States, crisp cookies are called biscuits. Many cookies are baked until crisp or just long enough that they remain soft.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
