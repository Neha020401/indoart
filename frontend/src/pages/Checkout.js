import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faCity,
  faGlobe,
  faCreditCard,
  faMoneyBillWave,
  faQrcode,
  faWallet,
  faCalendarAlt,
  faShoppingCart,
  faArrowRight,
  faArrowLeft,
  faCheck,
  faTruck,
  faInfoCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Checkout.css';

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: faCreditCard },
  { id: 'upi', name: 'UPI', icon: faQrcode },
  { id: 'netbanking', name: 'Net Banking', icon: faWallet },
  { id: 'cod', name: 'Cash on Delivery', icon: faMoneyBillWave },
];

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    deliveryDate: '',
  });
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load cart items and applied coupon from localStorage
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
    const storedCoupon = JSON.parse(localStorage.getItem('appliedCoupon'));
    setAppliedCoupon(storedCoupon);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'PIN code must be 6 digits';
        break;
      case 2:
        if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
        if (formData.paymentMethod === 'card') {
          if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
          if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
          if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Card expiry is required';
          if (!formData.cardCvv.trim()) newErrors.cardCvv = 'CVV is required';
        }
        if (formData.paymentMethod === 'upi') {
          if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
        }
        break;
      case 3:
        if (!formData.deliveryDate) newErrors.deliveryDate = 'Please select a delivery date';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Process the order
      const newOrderId = generateOrderId();
      setOrderId(newOrderId);
      // Store order details (in a real app, this would be sent to a server)
      localStorage.setItem('lastOrder', JSON.stringify({ ...formData, orderId: newOrderId }));
      // Clear cart and applied coupon
      localStorage.removeItem('cartItems');
      localStorage.removeItem('appliedCoupon');
      setStep(4);
    }
  };

  const generateOrderId = () => {
    return 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="check-step">
            <h2>Personal Information</h2>
            <div className="check-form-group">
              <label htmlFor="name">
                <FontAwesomeIcon icon={faUser} /> Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'check-error' : ''}
              />
              {errors.name && <span className="check-error-message">{errors.name}</span>}
            </div>
            <div className="check-form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'check-error' : ''}
              />
              {errors.email && <span className="check-error-message">{errors.email}</span>}
            </div>
            <div className="check-form-group">
              <label htmlFor="address">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'check-error' : ''}
              />
              {errors.address && <span className="check-error-message">{errors.address}</span>}
            </div>
            <div className="check-form-group">
              <label htmlFor="phone">
                <FontAwesomeIcon icon={faPhone} /> Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'check-error' : ''}
              />
              {errors.phone && <span className="check-error-message">{errors.phone}</span>}
            </div>
            <div className="check-form-row">
              <div className="check-form-group">
                <label htmlFor="city">
                  <FontAwesomeIcon icon={faCity} /> City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? 'check-error' : ''}
                />
                {errors.city && <span className="check-error-message">{errors.city}</span>}
              </div>
              <div className="check-form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? 'check-error' : ''}
                />
                {errors.state && <span className="check-error-message">{errors.state}</span>}
              </div>
            </div>
            <div className="check-form-row">
              <div className="check-form-group">
                <label htmlFor="pincode">PIN Code</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={errors.pincode ? 'check-error' : ''}
                />
                {errors.pincode && <span className="check-error-message">{errors.pincode}</span>}
              </div>
              <div className="check-form-group">
                <label htmlFor="country">
                  <FontAwesomeIcon icon={faGlobe} /> Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="check-step">
            <h2>Payment Information</h2>
            <div className="check-payment-methods">
              {paymentMethods.map(method => (
                <label key={method.id} className={`check-payment-method ${formData.paymentMethod === method.id ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleInputChange}
                  />
                  <FontAwesomeIcon icon={method.icon} />
                  <span>{method.name}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethod && <span className="check-error-message">{errors.paymentMethod}</span>}
            {formData.paymentMethod === 'card' && (
              <div className="check-card-details">
                <div className="check-form-group">
                  <label htmlFor="cardNumber">
                    <FontAwesomeIcon icon={faCreditCard} /> Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={errors.cardNumber ? 'check-error' : ''}
                  />
                  {errors.cardNumber && <span className="check-error-message">{errors.cardNumber}</span>}
                </div>
                <div className="check-form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={errors.cardName ? 'check-error' : ''}
                  />
                  {errors.cardName && <span className="check-error-message">{errors.cardName}</span>}
                </div>
                <div className="check-form-row">
                  <div className="check-form-group">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className={errors.cardExpiry ? 'check-error' : ''}
                    />
                    {errors.cardExpiry && <span className="check-error-message">{errors.cardExpiry}</span>}
                  </div>
                  <div className="check-form-group">
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      type="text"
                      id="cardCvv"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      className={errors.cardCvv ? 'check-error' : ''}
                    />
                    {errors.cardCvv && <span className="check-error-message">{errors.cardCvv}</span>}
                  </div>
                </div>
              </div>
            )}
            {formData.paymentMethod === 'upi' && (
              <div className="check-form-group">
                <label htmlFor="upiId">
                  <FontAwesomeIcon icon={faQrcode} /> UPI ID
                </label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className={errors.upiId ? 'check-error' : ''}
                />
                {errors.upiId && <span className="check-error-message">{errors.upiId}</span>}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="check-step">
            <h2>Order Confirmation</h2>
            <div className="check-order-summary">
              <h3>Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.id} className="check-order-item">
                  <img src={item.image} alt={item.title} className="check-order-item-image" />
                  <div className="check-order-item-details">
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="check-order-total">
                <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                {appliedCoupon && (
                  <p>Discount: -${calculateDiscount().toFixed(2)}</p>
                )}
                <p><strong>Total: ${calculateTotal().toFixed(2)}</strong></p>
              </div>
            </div>
            <div className="check-form-group">
              <label htmlFor="deliveryDate">
                <FontAwesomeIcon icon={faCalendarAlt} /> Preferred Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={errors.deliveryDate ? 'check-error' : ''}
              />
              {errors.deliveryDate && <span className="check-error-message">{errors.deliveryDate}</span>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="check-step">
            <h2>Order Placed Successfully!</h2>
            <div className="check-order-confirmation">
              <FontAwesomeIcon icon={faCheck} className="check-success-icon" />
              <p>Thank you for your order. Your order has been placed successfully.</p>
              <p>Order ID: <strong>{orderId}</strong></p>
              <p>We'll send a confirmation email with order details and tracking info.</p>
            </div>
            <div className="check-additional-links">
              {/* <a href="#" className="check-link">
                <FontAwesomeIcon icon={faTruck} /> Track Order
              </a> */}
              {/* <a href="#" className="check-link">
                <FontAwesomeIcon icon={faInfoCircle} /> Need Help?
              </a> */}
              <a href="./Gallery.js" className="check-link">
              <FontAwesomeIcon icon={faShoppingCart} /> Continue Shopping
            </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="check-container">
      <h1 className="check-title">Checkout</h1>
      <div className="check-progress">
        <div className={`check-progress-step ${step >= 1 ? 'active' : ''}`}>
          <span className="check-step-number">1</span>
          <span className="check-step-title">Personal Info</span>
        </div>
        <div className={`check-progress-step ${step >= 2 ? 'active' : ''}`}>
          <span className="check-step-number">2</span>
          <span className="check-step-title">Payment</span>
        </div>
        <div className={`check-progress-step ${step >= 3 ? 'active' : ''}`}>
          <span className="check-step-number">3</span>
          <span className="check-step-title">Confirmation</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="check-form">
        {renderStepContent()}
        <div className="check-navigation">
          {step > 1 && step < 4 && (
            <button type="button" onClick={handlePrevStep} className="check-btn check-btn-secondary">
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
          )}
          {step < 3 && (
            <button type="button" onClick={handleNextStep} className="check-btn check-btn-primary">
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="check-btn check-btn-primary">
              Place Order <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;

