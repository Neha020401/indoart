import React, { useState } from 'react';
import '../styles/TermsAndConditions.css';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('terms');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'terms':
        return (
          <>
            <h2>Terms and Conditions</h2>
            <p>Welcome to our platform. By using our services, you agree to comply with and be bound by the following terms and conditions:</p>
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing or using our platform, you agree to these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>
            <h3>2. User Accounts</h3>
            <p>You must create an account to use certain features of our platform. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
            <h3>3. Intellectual Property</h3>
            <p>All content on this platform, including but not limited to text, graphics, logos, images, and software, is the property of our company or our content suppliers and is protected by copyright laws.</p>
            <h3>4. User-Generated Content</h3>
            <p>By posting content on our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, publicly perform, publicly display, reproduce, and distribute such content.</p>
            <h3>5. Prohibited Activities</h3>
            <p>Users are prohibited from engaging in any illegal activities, violating intellectual property rights, or posting offensive or harmful content on our platform.</p>
            <h3>6. Limitation of Liability</h3>
            <p>We are not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
            <h3>7. Governing Law</h3>
            <p>These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.</p>
            <h3>8. Changes to Terms</h3>
            <p>We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes via email or through our platform.</p>
          </>
        );
      case 'privacy':
        return (
          <>
            <h2>Privacy Policy</h2>
            <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information:</p>
            <h3>1. Information Collection</h3>
            <p>We collect personal information when you register an account, make a purchase, or interact with our platform. This may include your name, email address, and payment information.</p>
            <h3>2. Use of Information</h3>
            <p>We use your information to provide and improve our services, process transactions, and communicate with you about your account and our platform.</p>
            <h3>3. Data Protection</h3>
            <p>We implement a variety of security measures to maintain the safety of your personal information and use industry-standard encryption to protect sensitive data transmission.</p>
            <h3>4. Third-Party Disclosure</h3>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as necessary to provide our services.</p>
            <h3>5. Cookies</h3>
            <p>We use cookies to enhance your experience on our platform. You can choose to have your computer warn you each time a cookie is being sent or turn off all cookies in your browser settings.</p>
            <h3>6. Your Rights</h3>
            <p>You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights or have any questions about our privacy practices.</p>
          </>
        );
      case 'faq':
        return (
          <>
            <h2>Frequently Asked Questions</h2>
            <h3>1. How do I create an account?</h3>
            <p>To create an account, click on the "Sign Up" button in the top right corner of the homepage. Fill in the required information and follow the prompts to complete your registration.</p>
            <h3>2. How can I buy artwork?</h3>
            <p>Browse our gallery and click on an artwork you're interested in. You can then select "Add to Cart" and proceed to checkout when you're ready to make a purchase.</p>
            <h3>3. What payment methods do you accept?</h3>
            <p>We accept major credit cards, PayPal, and bank transfers for artwork purchases.</p>
            <h3>4. How is the artwork shipped?</h3>
            <p>Artwork is carefully packaged and shipped via insured courier services. Shipping costs and estimated delivery times are provided at checkout.</p>
            <h3>5. Can I return artwork?</h3>
            <p>We offer a 14-day return policy for most artwork. Please refer to our Returns and Refunds policy for more details.</p>
            <h3>6. How do I become a seller on your platform?</h3>
            <p>Artists can apply to become sellers by submitting a portfolio for review. Visit our "Become an Artist" page for more information and to start the application process.</p>
            <h3>7. Is my personal information secure?</h3>
            <p>Yes, we use industry-standard security measures to protect your personal information. Please refer to our Privacy Policy for more details on how we handle and protect your data.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`terms-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="terms-header">
        <h1>Legal Information</h1>
        <button className="fullscreen-toggle" onClick={() => setIsFullscreen(!isFullscreen)}>
          {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
        </button>
      </div>
      <div className="terms-navigation">
        <button
          className={activeSection === 'terms' ? 'active' : ''}
          onClick={() => setActiveSection('terms')}
        >
          Terms & Conditions
        </button>
        <button
          className={activeSection === 'privacy' ? 'active' : ''}
          onClick={() => setActiveSection('privacy')}
        >
          Privacy Policy
        </button>
        <button
          className={activeSection === 'faq' ? 'active' : ''}
          onClick={() => setActiveSection('faq')}
        >
          FAQ
        </button>
      </div>
      <div className="terms-body">
        {renderContent()}
      </div>
    </div>
  );
};

export default TermsAndConditions;
