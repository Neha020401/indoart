import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import '../styles/Register.css';
import axios from 'axios';
// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faSpinner,
  faExclamationTriangle,
  faCheckCircle,
  faUser,
  faPalette,
  faArrowLeft,
  faCalendarAlt,
  faVenusMars
} from '@fortawesome/free-solid-svg-icons';
// import {
//   faGoogle,
//   faFacebook,
//   faTwitter,
//   faApple
// } from '@fortawesome/free-brands-svg-icons';

// Animation libraries
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { motion, 
  // AnimatePresence
 } from 'framer-motion';

// Date picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Utility for password strength
import zxcvbn from 'zxcvbn';

const Register = () => {
  // State management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: null,
    gender: '',
    isArtist:false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isArtist, setIsArtist] = useState(false);

  // Refs
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Hooks
  // const { register } = useAuth();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    document.title = "Create Account | Art Gallery";
  }, []);

  // Input validation
  const validateEmail = useCallback((email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }, []);

  const validatePassword = useCallback((password) => {
    const strength = zxcvbn(password);
    setPasswordStrength(strength.score);
    return strength.score >= 2;
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Check password strength
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: date
    }));
    if (errors.dateOfBirth) {
      setErrors(prev => ({
        ...prev,
        dateOfBirth: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!validatePassword(formData.password)) newErrors.password = 'Password is not strong enough';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://localhost:3001/register', {
        formData,
      });
  
      console.log(response);
  
      // Clear form and show success message
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: null,
        gender: '',
        isArtist: false,
      });
      setPasswordStrength(0);
      setRegisterSuccess(true);
  
      // Redirect to gallery page after 3 seconds
      setTimeout(() => {
        navigate('/gallery');
      }, 3000);
    } catch (error) {
      setErrors({
        submit: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  // Password strength indicator
  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="register-trees"></div>
        <div className="register-ground"></div>
      </div>

      <div className="register-header-links">
        <Link to="/" className="register-header-link">Home</Link>
        <Link to="/login" className="register-header-link">Sign In</Link>
      </div>

      <motion.div
        className="register-form-wrapper"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="register-back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Gallery
        </Link>

        <div className="register-header">
          <FontAwesomeIcon icon={faPalette} className="register-icon" />
          <h1>Create Your Account</h1>
          <p>Join our art community today</p>
        </div>

        <TransitionGroup>
          {Object.keys(errors).length > 0 && (
            <CSSTransition
              classNames="register-message"
              timeout={300}
            >
              <div className="register-error-container">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </CSSTransition>
          )}

        {registerSuccess && (
          <CSSTransition
            classNames="register-message"
            timeout={300}
          >
            <div className="register-success-container">
              <FontAwesomeIcon icon={faCheckCircle} />
              <p>Registration successful!</p>
            </div>
          </CSSTransition>
        )}
        </TransitionGroup>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-form-group">
            <label htmlFor="fullName">
              <FontAwesomeIcon icon={faUser} />
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              ref={fullNameRef}
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? 'register-error' : ''}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && (
              <span className="register-error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'register-error' : ''}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <span className="register-error-message">{errors.email}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
              Password
            </label>
            <div className="register-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                ref={passwordRef}
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'register-error' : ''}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <span className="register-error-message">{errors.password}</span>
            )}
            {formData.password && (
              <div className="register-password-strength">
                <div className={`register-strength-meter strength-${passwordStrength}`}></div>
                <span>{getPasswordStrengthLabel(passwordStrength)}</span>
              </div>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="confirmPassword">
              <FontAwesomeIcon icon={faLock} />
              Confirm Password
            </label>
            <div className="register-password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                ref={confirmPasswordRef}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'register-error' : ''}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="register-error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="register-form-group">
            <label htmlFor="dateOfBirth">
              <FontAwesomeIcon icon={faCalendarAlt} />
              Date of Birth
            </label>
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="Select your date of birth"
              className={`register-date-picker ${errors.dateOfBirth ? 'register-error' : ''}`}
            />
            {errors.dateOfBirth && (
              <span className="register-error-message">{errors.dateOfBirth}</span>
            )}
          </div>

          <div className="register-form-group">
            <label>
              <FontAwesomeIcon icon={faVenusMars} />
              Gender
            </label>
            <div className="register-radio-group">
              <label className="register-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                <span className="register-radio-button"></span>
                Male
              </label>
              <label className="register-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                <span className="register-radio-button"></span>
                Female
              </label>
              <label className="register-radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleInputChange}
                />
                <span className="register-radio-button"></span>
                Other
              </label>
            </div>
            {errors.gender && (
              <span className="register-error-message">{errors.gender}</span>
            )}
          </div>

          <div className="register-form-group">
            <label className="register-checkbox-label">
              <input
                type="checkbox"
                name="isArtist"
                checked={isArtist}
                onChange={() => setIsArtist(!isArtist)}
              />
              <span className="register-checkbox-button"></span>
              Are you an artist?
            </label>
          </div>


          <button
            type="submit"
            className="register-submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="register-social">
          {/* <div className="register-social-divider">
            <span>Or sign up with</span>
          </div> */}
          <div className="register-social-buttons">
            {/* <button className="register-social-button register-google">
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </button> */}
            {/* <button className="register-social-button register-facebook">
              <FontAwesomeIcon icon={faFacebook} />
              Facebook
            </button>
            <button className="register-social-button register-twitter">
              <FontAwesomeIcon icon={faTwitter} />
              Twitter
            </button>
            <button className="register-social-button register-apple">
              <FontAwesomeIcon icon={faApple} />
              Apple
            </button> */}
          </div>
        </div>

        <p className="register-login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func
};

export default Register;

