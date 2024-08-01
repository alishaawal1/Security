import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../style/Navbar.css';
import Logo from '../images/Logo.png';

const Navbar = () => {
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="navbar custom-navbar">
      <div className="navbar-content">
        <NavLink className="navbar-brand" to="/home">
          <img src={Logo} alt="Logo" />
        </NavLink>
        
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home" activeclassname='active'>Home</NavLink>
          </li>
          <li className="nav-item dropdown"
              onMouseEnter={() => setShowCategoriesDropdown(true)}
              onMouseLeave={() => setShowCategoriesDropdown(false)}>
            <NavLink className="nav-link" to="/categories">
              Categories
            </NavLink>
            <ul className={`dropdown-menu ${showCategoriesDropdown ? 'show' : ''}`}>
              
              <li><Link className="dropdown-item" to="/categories/pastries">Pastries</Link></li>
              <li><Link className="dropdown-item" to="/categories/donuts">Donuts</Link></li>
              <li><Link className="dropdown-item" to="/categories/croissant">Croissant</Link></li>
              <li><Link className="dropdown-item" to="/categories/bagel">Bagel</Link></li>
              <li><Link className="dropdown-item" to="/categories/cookies">Cookies</Link></li>
              
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/cakes">Cakes</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/aboutus">About Us</NavLink>
          </li>
        </ul>
        
        <div className="navbar-actions">
          <Link to="/search" className="nav-icon">🔍</Link>
          <Link to="/cart" className="nav-icon">🛒</Link>
          {user ? (
            <div className="user-dropdown">
              <button className="user-dropdown-toggle">
                Welcome, {user.firstName}!
              </button>
              <ul className="user-dropdown-menu"
              onMouseEnter={() => setShowCategoriesDropdown(true)}
              onMouseLeave={() => setShowCategoriesDropdown(false)}>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/passwordreset">Change password</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link className="btn btn-outline-primary" to='/login'>Login</Link>
              <Link className="btn btn-outline-success" to='/register'>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar