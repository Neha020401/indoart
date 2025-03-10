import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrash, 
  faArrowRight, 
  faTags, 
  faInfoCircle, 
  faSpinner, 
  faShoppingCart, 
  faCheck,
  faMinus,
  faPlus,
  faGift,
  faTruck,
  faUndo,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/Cart.css';

const COUPON_CODES = [
  { code: 'WELCOME10', discount: 0.1, condition: 'New customers only', minPurchase: 50 },
  { code: 'SUMMER2023', discount: 0.15, condition: 'Valid until August 31, 2023', minPurchase: 100 },
  { code: 'ARTLOVER20', discount: 0.2, condition: 'For purchases over Rs. 500', minPurchase: 500 },
  { code: 'FREESHIP', discount: 0, freeShipping: true, condition: 'Free shipping on orders over Rs. 300', minPurchase: 300 },
];

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponList, setShowCouponList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [showCouponAppliedPopup, setShowCouponAppliedPopup] = useState(false);

 

  const loadCartItems = () => {
    setLoading(true);
    // Simulate an API call to fetch cart items
    setTimeout(() => {
      const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(storedItems);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      );
      updateLocalStorage(updatedItems);  // Pass the updatedItems to localStorage
      return updatedItems;
    });
  };
  
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      updateLocalStorage(updatedItems);  // Pass the updatedItems to localStorage
      return updatedItems;
    });
  };
  
  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  
  const applyCoupon = (coupon) => {
    if (appliedCoupon) {
      // If there is already an applied coupon, remove it first
      removeCoupon();
    }

    if (coupon) {
      if (subtotal < coupon.minPurchase) {
        setError(`This coupon is only valid for purchases over Rs. ${coupon.minPurchase}`);
        return;
      }
      setAppliedCoupon(coupon);
      setError('');
      setSuccess(`Coupon ${coupon.code} applied successfully!`);
      setShowCongrats(true);
      setShowCouponAppliedPopup(true);
      setTimeout(() => {
        setShowCongrats(false);
        setShowCouponAppliedPopup(false);
      }, 3000);
    } else {
      setError('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setSuccess('Coupon removed successfully');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? (appliedCoupon.discount * subtotal) : 0;
  const shipping = subtotal > 300 || (appliedCoupon && appliedCoupon.freeShipping) ? 0 : 15;
  const total = subtotal - discount + shipping;

  if (loading) {
    return (
      <div className="cart-loading">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <FontAwesomeIcon icon={faShoppingCart} size="4x" />
          <p>Your cart is empty.</p>
          <Link to="/gallery" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-content">
            <div className="cart-items">
              <TransitionGroup>
                {cartItems.map(item => (
                  <CSSTransition key={item.id} timeout={300} classNames="fade">
                    <div className="cart-item">
                      <div className="item-image-container">
                        <img src={item.image} alt={item.title} className="item-image" />
                      </div>
                      <div className="item-details">
                        <h3>{item.title}</h3>
                        <p className="item-artist">by {item.artist}</p>
                        <p className="item-price">Rs. {item.price.toFixed(2)}</p>
                      </div>
                      <div className="item-quantity">
                        <button 
                          className="quantity-btn" 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="quantity-input"
                        />
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                      <p className="item-total">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                      <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
            <div className="cart-summary">
              <div className="coupon-section">
                <h3>Apply Coupon</h3>
                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <button onClick={applyCoupon} className="apply-coupon-btn">
                    Apply
                  </button>
                </div>
                {error && <p className="error-message"><FontAwesomeIcon icon={faInfoCircle} /> {error}</p>}
                {success && <p className="success-message"><FontAwesomeIcon icon={faCheck} /> {success}</p>}
                {appliedCoupon && (
                  <div className="applied-coupon">
                    <p><FontAwesomeIcon icon={faGift} /> Applied: {appliedCoupon.code}</p>
                    <button onClick={removeCoupon} className="remove-coupon-btn">Remove</button>
                  </div>
                )}
                <button className="show-coupons" onClick={() => setShowCouponList(!showCouponList)}>
                  <FontAwesomeIcon icon={faTags} /> {showCouponList ? 'Hide' : 'Show'} Available Coupons
                </button>
                <CSSTransition
                  in={showCouponList}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <div className="coupon-list">
                    {COUPON_CODES.map(coupon => (
                      <div key={coupon.code} className="coupon-item">
                        <p><strong>{coupon.code}</strong>: {coupon.discount * 100}% off</p>
                        <p className="coupon-condition">
                          <FontAwesomeIcon icon={faInfoCircle} /> {coupon.condition}
                        </p>
                        <button className="apply-coupon-btn" onClick={() => applyCoupon(coupon)}>
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </CSSTransition>
              </div>
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount:</span>
                    <span>-Rs. {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="checkout-button">
                Proceed to Checkout <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
          <div className="cart-features">
            <div className="feature">
              <FontAwesomeIcon icon={faTruck} />
              <span>Free Shipping on orders over $300</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faUndo} />
              <span>30-Day Returns</span>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faShieldAlt} />
              <span>Secure Payments</span>
            </div>
          </div>
        </>
      )}
      <CSSTransition
        in={showCongrats}
        timeout={300}
        classNames="congrats"
        unmountOnExit
      >
        <div className="congrats-popup">
          <FontAwesomeIcon icon={faCheck} />
          <p>Congratulations! Your coupon has been applied.</p>
        </div>
      </CSSTransition>
      <CSSTransition
        in={showCouponAppliedPopup}
        timeout={300}
        classNames="congrats"
        unmountOnExit
      >
        <div className="congrats-popup">
          <FontAwesomeIcon icon={faCheck} />
          <p>Coupon applied successfully!</p>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Cart;