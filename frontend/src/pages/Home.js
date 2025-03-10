import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../styles/Home.css';

function Home({isSignedIn}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const totalSlides = 3;
  const featuredArtworksContainerRef = useRef(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const featuredArtworks = [
    {
        "id": 1,
        "title": "",
        "artist": "Ocean Abstract Painting",
        "image": require("../images/ocean_paint.jpg"),
        "price": 8368.61,
        "originalPrice": 9298.45,
        "discount": 10
    },
    {
        id: 2,
        title: '',
        artist: 'Village Abstract Painting',
        "image": require("../images/village_paint.jpg"),
        price: 8368.61,
        originalPrice: 9298.45,
        discount: 10
    },
    {
        id: 3,
        title: '',
        artist: 'Oriental Peacock, Japanese Vintage Art',
        "image": require("../images/peacock_paint.webp"),
        price: 8368.61,
        originalPrice: 9298.45,
        discount: 10
    },
    {
        id: 4,
        title: '',
        artist: 'Mountain Abstract Painting',
        "image": require("../images/mountain_paint.jpg"),
        price: 8368.61,
        originalPrice: 9298.45,
        discount: 10
    },
    {
        id: 4,
        title: '',
        artist: 'Bengal Tiger Abstract Painting',
        "image": require("../images/tiger_paint.webp"),
        price: 8368.61,
        originalPrice: 9298.45,
        discount: 10
    },
    {
        id: 4,
        title: '',
        artist: 'Mountain Abstract Painting',
        "image": require("../images/mother_paint.jpg"),
        price: 8368.61,
        originalPrice: 9298.45,
        discount: 10
    },
];

  const testimonials = [
    {
      id: 1,
      name: 'Avinash Kr',
      // role: 'Co-Founder at xyz',
      image: '/testimonial1.jpg',
      content: 'Like this vide and ask your questions in comment section, don\'t forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.'
    },
    {
      id: 2,
      name: 'Bharat Kunal',
      // role: 'Manager at xyz',
      image: '/testimonial2.jpg',
      content: 'Like this vide and ask your questions in comment section, don\'t forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.'
    },
    {
      id: 3,
      name: 'Prabhakar D',
      // role: 'Founder / CEO at xyz',
      image: '/testimonial3.jpg',
      content: 'Like this vide and ask your questions in comment section, don\'t forget to Subscribe Easy Tutorials YouTube channel to watch more videos of website designing, digital marketing and photoshop.'
    }
  ];

  const services = [
    { icon: 'fa-palette', title: 'Art Advisory', description: 'Expert guidance for your collection' },
    { icon: 'fa-credit-card', title: 'Cash on Delivery', description: 'Convenient payment options' },
    { icon: 'fa-undo-alt', title: 'Returns', description: 'Hassle-free return policy' },
    { icon: 'fa-image', title: 'Museum Grade', description: 'Premium quality artwork' }
  ];
  

  const sliderImages = [
    { src: require('../images/slider1.jpg'), message: 'Explore the World of Art' },
    { src: require('../images/slider2.jpg'), message: 'Discover Masterpieces by Famous Artists' },
    { src: require('../images/slider3.jpg'), message: 'Collect and Support Emerging Talents' },
];


  const scrollLeft = () => {
    if (featuredArtworksContainerRef.current) {
      featuredArtworksContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (featuredArtworksContainerRef.current) {
      featuredArtworksContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${sliderImages[currentSlide].src})` }}>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to IndoArt</h1>
          <p className="hero-description">Discover and collect unique artworks from talented artists around the world.</p>
          {isSignedIn?<Link to="/artist-dashboard" className="cta-button">Add Arts</Link>:<Link to="/gallery" className="cta-button">Explore Gallery</Link>}
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="featured-artworks">
        <h2 className="section-title">Featured Artworks</h2>
        {/* View More Button */}
  <div className="view-more-container">
    <Link to="/gallery" className="view-more-btn">View More</Link>
  </div>
        <div className="carousel-container">
          <button className="carousel-arrow left" onClick={scrollLeft}>←</button>
          <div className="artwork-slider" ref={featuredArtworksContainerRef}>
            {featuredArtworks.map((artwork) => (
              <div key={artwork.id} className="artwork-item">
                {artwork.discount && (
                  <div className="discount-badge">{artwork.discount}% off</div>
                )}
                <button className="wishlist-button">
                  <Heart className="heart-icon" />
                </button>
                <img src={artwork.image} alt={artwork.title} className="artwork-image" />
                <div className="artwork-details">
                  <div className="artwork-info">
                    <h3 className="artwork-title">{artwork.title}</h3>
                    <p className="artist-name">{artwork.artist}</p>
                    <div className="price-container">
                      <span className="artwork-price">Rs. {artwork.price.toLocaleString()}</span>
                      {artwork.originalPrice && (
                        <span className="original-price">Rs. {artwork.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <Link to={`/product/${artwork.id}`} className="view-details-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={scrollRight}>→</button>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2 className="section-title">About Us</h2>
        <p>IndoArt is an online platform connecting art lovers and artists around the world, showcasing the beauty of art, and providing a space to explore unique collections.</p>
      </section>

      {/* Join Us Section */}
      <section className="join-us">
        <h2 className="section-title">Join Our Community</h2>
        <p>Whether you're an artist or a collector, we invite you to join our vibrant community of art enthusiasts.</p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button">Sign Up as Artist</Link>
          <Link to="/register" className="cta-button secondary">Sign Up as Collector</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

