import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-section about">
            <h3>About IndoArtA</h3>
            <p>IndoArt is a vibrant online marketplace where artists and art enthusiasts come together to discover, purchase, and sell unique works of art.</p>
            <p>We curate a wide variety of styles from contemporary to traditional, ensuring something for every collector and artist.</p>
          </div>

          <div className="footer-section quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/artists">Artists</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><strong>Email:</strong> <a href="mailto:info@indoart.com">info@artgallery.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+919876543211">+91 9876543211</a></p>
            <p><strong>Address:</strong> IndoArt Pvt. Ltd., 10th Floor, Prestige Towers, MG Road, Bangalore, Karnataka 560001, India</p>
          </div>

          <div className="footer-section follow-us">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2023 ArtGallery. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
