import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import '../styles/Login.css';
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
  faTimes,
  faUser,
  faPalette,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle,
  faFacebook,
  faTwitter,
  faApple
} from '@fortawesome/free-brands-svg-icons';

// Animation libraries
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { motion, AnimatePresence } from 'framer-motion';

// reCAPTCHA
// import ReCAPTCHA from "react-google-recaptcha";

// Utility for password strength
import zxcvbn from 'zxcvbn';

const Login = ({setIsSignedIn}) => {
  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  // const [captchaValue, setCaptchaValue] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [showSocialLogin, setShowSocialLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // const recaptchaRef = useRef(null);

  // Hooks
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const navigate = useNavigate();
  const lockTimeoutRef = useRef(null);

  // Effects
  useEffect(() => {
    document.title = "Login | Art Gallery";
    checkRememberedUser();
    return () => {
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const interval = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockTimer]);

  // Load remembered user
  const checkRememberedUser = () => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  };

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
  const handleInputChange = async (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === 'checkbox' ? checked : value;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isLocked) {
      return;
    }
  
    // Validate form
    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsLoading(true);
  
    try{
      const response = await axios.post('http://localhost:3001/login',{
        formData
      })
      if( response.data.message=='success'){
        setIsSignedIn(response.data.isArtist)
        navigate('/')
      }
      
    } catch (error) {
      alert(error)
      
    } finally {
      setIsLoading(false);
    }
  };
  

  // Handle failed login attempts
  const handleFailedLogin = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
  
    if (newAttempts >= 3) {
      const lockTime = Math.min(Math.pow(2, newAttempts - 3) * 30, 3600);
      setIsLocked(true);
      setLockTimer(lockTime);
  
      lockTimeoutRef.current = setTimeout(() => {
        setIsLocked(false);
        setLoginAttempts(0);
      }, lockTime * 1000);
    }
  
    // Show an error message after failed login attempts
    setErrors({
      submit: 'Incorrect email or password. Please try again.'
    });
  };
  
  // Social login handlers
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: 'Failed to sign in with Google. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithFacebook();
      navigate('/dashboard');
    } catch (error) {
      setErrors({
        submit: 'Failed to sign in with Facebook. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(forgotPasswordEmail)) {
      setErrors({
        forgotPassword: 'Please enter a valid email address'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Web3Forms API integration (to be implemented)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0d84b745-9681-4650-bff5-80d90ba6be11',
          email: forgotPasswordEmail,
          subject: 'Password Reset Request',
          message: `Password reset requested for ${forgotPasswordEmail}`
        })
      });

      if (response.ok) {
        setForgotPasswordSuccess(true);
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotPasswordEmail('');
          setForgotPasswordSuccess(false);
        }, 3000);
      } else {
        throw new Error('Failed to send reset email');
      }
    } catch (error) {
      setErrors({
        forgotPassword: 'Failed to send reset email. Please try again.'
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
  

  // Render helpers
  const renderForgotPasswordModal = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="login-modal-overlay"
    >
      
      <div className="login-modal">
        <button
          className="login-modal-close"
          onClick={() => setShowForgotPassword(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Reset Password</h2>
        {forgotPasswordSuccess ? (
          <div className="login-success-message">
            <FontAwesomeIcon icon={faCheckCircle} />
            <p>Password reset instructions have been sent to your email.</p>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="login-form-group">
              <label htmlFor="forgotPasswordEmail">
                <FontAwesomeIcon icon={faEnvelope} />
                Email Address
              </label>
              <input
                type="email"
                id="forgotPasswordEmail"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className={errors.forgotPassword ? 'login-error' : ''}
                placeholder="Enter your email"
                required
              />
              {errors.forgotPassword && (
                <span className="login-error-message">{errors.forgotPassword}</span>
              )}
            </div>
            <button
              type="submit"
              className="login-submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
  

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-trees"></div>
        <div className="login-ground"></div>
      </div>

      <div className="login-header-links">
        <Link to="/" className="login-header-link">Home</Link>
        <Link to="/register" className="login-header-link">Create Account</Link>
      </div>
      
      <motion.div
        className="login-form-wrapper"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        
        <Link to="/" className="login-back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Gallery
        </Link>

        <div className="login-header">
          <FontAwesomeIcon icon={faPalette} className="login-icon" />
          <h1>Welcome Back</h1>
          <p>Sign in to continue to Art Gallery</p>
        </div>

        <TransitionGroup>
          {Object.keys(errors).length > 0 && (
            <CSSTransition
              classNames="login-message"
              timeout={300}
            >
              <div className="login-error-container">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </CSSTransition>
          )}

          {loginSuccess && (
            <CSSTransition
              classNames="login-message"
              timeout={300}
            >
              <div className="login-success-container">
                <FontAwesomeIcon icon={faCheckCircle} />
                <p>Login successful! Redirecting...</p>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
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
              className={errors.email ? 'login-error' : ''}
              placeholder="Enter your email"
              disabled={isLocked}
              required
            />
            {errors.email && (
              <span className="login-error-message">{errors.email}</span>
            )}
          </div>

          <div className="login-form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
              Password
            </label>
            <div className="login-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                ref={passwordRef}
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'login-error' : ''}
                placeholder="Enter your password"
                disabled={isLocked}
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <span className="login-error-message">{errors.password}</span>
            )}
            {formData.password && (
              <div className="login-password-strength">
                <div className={`login-strength-meter strength-${passwordStrength}`}></div>
                <span>{getPasswordStrengthLabel(passwordStrength)}</span>
              </div>
            )}
          </div>

          <div className="login-form-options">
            <label className="login-remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLocked}
              />
              Remember me
            </label>
            <button
              type="button"
              className="login-forgot-password"
              onClick={() => setShowForgotPassword(true)}
              disabled={isLocked}
            >
              Forgot Password?
            </button>
          </div>

          {/* <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="YOUR_RECAPTCHA_SITE_KEY"
            onChange={(value) => setCaptchaValue(value)}
            className="login-recaptcha"
          /> */}

          {isLocked ? (
            <div className="login-locked-message">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>Account temporarily locked. Please try again in {Math.ceil(lockTimer)} seconds.</p>
            </div>
          ) : (
            <button
              type="submit"
              className="login-submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          )}
        </form>

        {/* {showSocialLogin && (
          <div className="login-social">
            <div className="login-social-divider">
              <span>Or continue with</span>
            </div>
            <div className="login-social-buttons">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="login-social-button login-google"
                disabled={isLocked || isLoading}
              >
                <FontAwesomeIcon icon={faGoogle} />
                Google
              </button>
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="login-social-button login-facebook"
                disabled={isLocked || isLoading}
              >
                <FontAwesomeIcon icon={faFacebook} />
                Facebook
              </button>
              <button
                type="button"
                className="login-social-button login-twitter"
                disabled={isLocked || isLoading}
              >
                <FontAwesomeIcon icon={faTwitter} />
                Twitter
              </button>
              <button
                type="button"
                className="login-social-button login-apple"
                disabled={isLocked || isLoading}
              >
                <FontAwesomeIcon icon={faApple} />
                Apple
              </button>
            </div>
          </div>
        )} */}

        <p className="login-register-link">
          Don't have an account?{' '}
          <Link to="/register">Create one now</Link>
        </p>
      </motion.div>

      <AnimatePresence>
        {showForgotPassword && renderForgotPasswordModal()}
      </AnimatePresence>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func
};

export default Login;

