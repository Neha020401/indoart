import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Toggle the dropdown visibility on hover
  const handleCartHover = () => {
    setIsDropdownVisible(true);
  };

  const handleCartLeave = () => {
    setIsDropdownVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Load cart items from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);

    const totalItems = storedItems.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalItems);
  }, []);

  // Handle increasing/decreasing/removing cart items
  const handleQuantityChange = (id, change) => {
    const updatedItems = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="header-logo">
          <Link to="/" className="header-logo-link">IndoArt</Link>
        </div>

        {/* Navigation Menu */}
        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/artists">Artists</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {/* Cart Icon with Badge */}
            <li className="header-cart-icon" onMouseEnter={handleCartHover} onMouseLeave={handleCartLeave}>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartItemCount > 0 && <span className="header-cart-badge">{cartItemCount}</span>}
              </Link>

              {isDropdownVisible && (
                <div className="header-cart-dropdown">
                  {cartItems.length === 0 ? (
                    <div className="header-cart-empty">
                      <p>Your cart is empty. Continue shopping!</p>
                      <Link to="/gallery" className="header-continue-shopping">Continue Shopping</Link>
                    </div>
                  ) : (
                    <div className="header-cart-items">
                      {cartItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="header-cart-item">
                          <img src={item.image} alt={item.title} className="header-cart-item-image" />
                          <div className="header-cart-item-details">
                            <p>{item.title}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <div className="header-cart-item-quantity">
                              <button onClick={() => handleQuantityChange(item.id, -1)}><FontAwesomeIcon icon={faMinus} /></button>
                              <span>{item.quantity}</span>
                              <button onClick={() => handleQuantityChange(item.id, 1)}><FontAwesomeIcon icon={faPlus} /></button>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)} className="header-remove-item-btn">
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <Link to="/cart" className="header-view-more">View More</Link>
                    </div>
                  )}
                </div>
              )}
            </li>

            {/* Conditionally rendered links for logged-in users */}
            {user ? (
              <>
                <li><Link to={user.userType === 'artist' ? '/artist-dashboard' : '/customer-dashboard'}>Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={logout} className="header-logout-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </nav>

        {/* Hamburger Menu */}
        <div className="header-menu-toggle" onClick={toggleMenu}>
          <div className={`header-hamburger ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
