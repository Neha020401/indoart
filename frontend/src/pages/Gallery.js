import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faHeart as fasHeart, faSearch, faFilter, faStar, faChevronLeft, faChevronRight, faTimes, faBolt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Gallery.css';

function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    priceRange: '',
    artist: '',
    minRating: 0
  });
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState(3600); // 1 hour in seconds

  const flashSaleArtworksRef = useRef(null);
  const categoryListRef = useRef(null);

  useEffect(() => {
    // Simulated artwork data
    const dummyArtworks = [
      { 
        id: 1, 
        title: 'Ocean Abstract Painting', 
        artist: 'Emma Johnson', 
        price: 8368.61, 
        originalPrice: 9298.45, 
        "image": require("../images/ocean_paint.jpg"),
        category: 'Vintage', 
        rating: 4.3, 
        reviews: 35, 
        discount: 22, 
        isFlashSale: true 
      },
      { 
        id: 2, 
        title: 'Village Abstract Painting', 
        artist: 'Michael Chen', 
        price: 7526, 
        originalPrice: 9999, 
        "image": require("../images/village_paint.jpg"),
        category: 'Vintage', 
        rating: 4.6, 
        reviews: 75, 
        discount: 16, 
        isFlashSale: true 
      },
      { 
        id: 4, 
        title: 'Modern City Skyline', 
        artist: 'Alex Rivera', 
        price: 9268.61, 
        originalPrice: 10298.45, 
        "image": require("../images/city_paint.jpeg"), 
        category: 'Modern', 
        rating: 4.7, 
        reviews: 95, 
        discount: 10, 
        isFlashSale: false 
      },
      { 
        id: 5, 
        title: 'Sunset over Mountains', 
        artist: 'Sarah Thompson', 
        price: 5868.61, 
        originalPrice: 6598.45, 
        "image": require("../images/sunset_mountain_paint.jpg"), 
        category: 'Landscape', 
        rating: 4.6, 
        reviews: 78, 
        discount: 11, 
        isFlashSale: false 
      },
      { 
        id: 6, 
        title: 'Abstract Geometric Shapes', 
        artist: 'David Lee', 
        price: 7168.61, 
        originalPrice: 7998.45, 
        "image": require("../images/geometric_paint.jpg"), 
        category: 'Abstract', 
        rating: 4.3, 
        reviews: 55, 
        discount: 10, 
        isFlashSale: false 
      },
      { 
        id: 3, 
        title: 'Peacock, Japanese Vintage Art', 
        artist: 'Yuki Tanaka', 
        price: 6368.61, 
        originalPrice: 7298.45, 
        "image": require("../images/peacock_paint.webp"),
        category: 'Vintage', 
        rating: 4.2, 
        reviews: 65, 
        discount: 12, 
        isFlashSale: false 
      },
      { 
        id: 7, 
        title: 'Vibrant Floral Still Life', 
        artist: 'Maria Garcia', 
        price: 6768.61, 
        originalPrice: 7498.45, 
        "image": require("../images/floral_paint.jpg"), 
        category: 'Still Life', 
        rating: 4.9, 
        reviews: 110, 
        discount: 9, 
        isFlashSale: true 
      },
      { 
        id: 8, 
        title: 'Surrealist Dream Landscape', 
        artist: 'Lucas Dubois', 
        price: 8968.61, 
        originalPrice: 9998.45, 
        "image": require("../images/surreal_dream_paint.jpg"), 
        category: 'Surrealism', 
        rating: 4.7, 
        reviews: 88, 
        discount: 10, 
        isFlashSale: false 
      },
      { 
        id: 9, 
        title: 'Minimalist Portrait', 
        artist: 'Emily White', 
        price: 5468.61, 
        originalPrice: 5998.45, 
        "image": require("../images/portrait_paint.jpg"), 
        category: 'Portrait', 
        rating: 4.4, 
        reviews: 72, 
        discount: 8, 
        isFlashSale: false 
      },
      { 
        id: 10, 
        title: 'Expressionist Cityscape', 
        artist: 'Marcus Brown', 
        price: 7868.61, 
        originalPrice: 8798.45, 
        "image": require("../images/cityscape_paint.jpg"), 
        category: 'Modern', 
        rating: 4.6, 
        reviews: 98, 
        discount: 10, 
        isFlashSale: false 
      },
      { 
        id: 11, 
        title: 'Impressionist Garden Scene', 
        artist: 'Sophie Martin', 
        price: 6968.61, 
        originalPrice: 7798.45, 
        "image": require("../images/garden_paint.jpg"),
        category: 'Impressionism', 
        rating: 4.8, 
        reviews: 105, 
        discount: 10, 
        isFlashSale: true 
      },
      { 
        id: 12, 
        title: 'Abstract Color Field', 
        artist: 'Ryan Taylor', 
        price: 7368.61, 
        originalPrice: 8198.45, 
        "image": require("../images/colorfield_paint.jpg"),
        category: 'Abstract', 
        rating: 4.5, 
        reviews: 80, 
        discount: 10, 
        isFlashSale: false 
      },
      { 
        id: 13, 
        title: 'Futuristic Sci-Fi Landscape', 
        artist: 'Zoe Anderson', 
        price: 8568.61, 
        originalPrice: 9498.45, 
        "image": require("../images/scifi_future_paint.jpg"), 
        category: 'Contemporary', 
        rating: 4.7, 
        reviews: 92, 
        discount: 9, 
        isFlashSale: false 
      },
      { 
        id: 14, 
        title: 'Classical Still Life with Fruits', 
        artist: 'Thomas Moore', 
        price: 6168.61, 
        originalPrice: 6898.45, 
        "image": require("../images/fruit_paint.jpg"),
        category: 'Still Life', 
        rating: 4.6, 
        reviews: 75, 
        discount: 10, 
        isFlashSale: false 
      },
      { 
        id: 15, 
        title: 'Pop Art Celebrity Portrait', 
        artist: 'Olivia Clark', 
        price: 7668.61, 
        originalPrice: 8598.45, 
        "image": require("../images/popart_celeb_paint.jpg"),
        category: 'Pop Art', 
        rating: 4.9, 
        reviews: 115, 
        discount: 10, 
        isFlashSale: true 
      },
      { 
        id: 16, 
        title: 'Atmospheric Seascape', 
        artist: 'Nathan Reed', 
        price: 6568.61, 
        originalPrice: 7298.45, 
        "image": require("../images/seascape_paint.jpg"),
        category: 'Landscape', 
        rating: 4.7, 
        reviews: 88, 
        discount: 10, 
        isFlashSale: false 
      }
    ];

    // Set artworks data to state
    setArtworks(dummyArtworks);
    setFilteredArtworks(dummyArtworks);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashSaleTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'abstract', name: 'Abstract Art' },
    { id: 'vintage', name: 'Vintage' },
    { id: 'modern', name: 'Modern Art' },
    { id: 'contemporary', name: 'Contemporary' },
    { id: 'landscape', name: 'Landscape' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'still-life', name: 'Still Life' },
    { id: 'surrealism', name: 'Surrealism' },
    { id: 'impressionism', name: 'Impressionism' },
    { id: 'pop-art', name: 'Pop Art' },
  ];

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    applyFilters(category, filters);
  };

  const handleViewDetails = (artworkId) => {
    navigate(`/artwork/${artworkId}`);  // Correctly navigate using the artworkId
  };

  const toggleWishlist = (artworkId) => {
    setWishlist(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const formatPrice = (price) => {
    return `Rs. ${price.toFixed(2)}`;
  };

  const applyFilters = (category, filters) => {
    let filtered = artworks;

    if (category !== 'all') {
      filtered = filtered.filter(art => art.category.toLowerCase() === category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(art => art.price >= min && art.price <= max);
    }

    if (filters.artist) {
      filtered = filtered.filter(art => art.artist.toLowerCase().includes(filters.artist.toLowerCase()));
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter(art => art.rating >= filters.minRating);
    }

    setFilteredArtworks(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(currentCategory, newFilters);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const scroll = (direction) => {
    if (flashSaleArtworksRef.current) {
      const scrollAmount = 330; // card width + margin
      flashSaleArtworksRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollCategories = (direction) => {
    if (categoryListRef.current) {
      const scrollAmount = 200;
      categoryListRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="artg-gallery-main">
      {/* Advanced Search Panel */}
      <div className="artg-search-panel">
        <div className="artg-search-wrapper">
          <div className="artg-search-input">
            <FontAwesomeIcon icon={faSearch} className="artg-search-icon" />
            <input 
              type="text" 
              placeholder="Search for paintings, artists, or art styles..."
              className="artg-search-field"
            />
          </div>
          <button className="artg-search-button">
            <FontAwesomeIcon icon={faSearch} />
            Search
          </button>
        </div>
        <button className="artg-filter-button" onClick={() => setShowFilters(!showFilters)}>
          <FontAwesomeIcon icon={faFilter} />
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="artg-filter-panel">
          <div className="artg-filter-header">
            <h3>Filters</h3>
            <button className="artg-close-filters" onClick={() => setShowFilters(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="artg-filter-content">
            <div className="artg-filter-group">
              <label htmlFor="priceRange">Price Range:</label>
              <select id="priceRange" name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                <option value="">All Prices</option>
                <option value="0-5000">Under Rs. 5,000</option>
                <option value="5000-7500">Rs. 5,000 - Rs. 7,500</option>
                <option value="7500-10000">Rs. 7,500 - Rs. 10,000</option>
                <option value="10000-100000">Above Rs. 10,000</option>
              </select>
            </div>
            <div className="artg-filter-group">
              <label htmlFor="artist">Artist Name:</label>
              <input type="text" id="artist" name="artist" value={filters.artist} onChange={handleFilterChange} placeholder="Enter artist name" />
            </div>
            <div className="artg-filter-group">
              <label htmlFor="minRating">Minimum Rating:</label>
              <select id="minRating" name="minRating" value={filters.minRating} onChange={handleFilterChange}>
                <option value="0">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="artg-category-nav">
        <button className="artg-scroll-button artg-left" onClick={() => scrollCategories('left')}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="artg-category-list" ref={categoryListRef}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`artg-category-button ${currentCategory === category.id ? 'artg-active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <button className="artg-scroll-button artg-right" onClick={() => scrollCategories('right')}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Flash Sale Section */}
<section className="artg-flash-sale">
  <div className="artg-flash-header">
    <h2><FontAwesomeIcon icon={faBolt} /> Flash Sale - Limited Time Offers!</h2>
    <p className="artg-countdown">Hurry! Ends in: {formatTime(flashSaleTimeLeft)}</p>
  </div>
  <div className="artg-carousel-container">
    <button 
      className="artg-carousel-arrow artg-left"
      onClick={() => scroll('left')}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <div className="artg-artwork-slider" ref={flashSaleArtworksRef}>
      {artworks.filter(art => art.isFlashSale).map(artwork => (
        <div key={artwork.id} className="artg-artwork-item">
          <div className="artg-discount-badge">{artwork.discount}% off</div>
          <button 
            className={`artg-wishlist-button ${wishlist.includes(artwork.id) ? 'artg-active' : ''}`}
            onClick={() => toggleWishlist(artwork.id)}
          >
            <FontAwesomeIcon icon={wishlist.includes(artwork.id) ? fasHeart : farHeart} className="artg-heart-icon" />
          </button>
          <img src={artwork.image} alt={artwork.title} className="artg-artwork-image" />
          <div className="artg-artwork-details">
            <div className="artg-artwork-info">
              <h3 className="artg-artwork-title">{artwork.title}</h3>
              <p className="artg-artist-name">{artwork.artist}</p>
              <div className="artg-price-container">
                <span className="artg-current-price">{formatPrice(artwork.price)}</span>
                <span className="artg-original-price">{formatPrice(artwork.originalPrice)}</span>
              </div>
            </div>
            {/* Link the View Details button to the navigate function */}
            <button className="artg-view-details-btn" onClick={() => handleViewDetails(artwork.id)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
    <button 
      className="artg-carousel-arrow artg-right"
      onClick={() => scroll('right')}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>
</section>

{/* Regular Products Grid */}
<div className="artg-product-grid">
  {filteredArtworks.map(artwork => (
    <div key={artwork.id} className="artg-artwork-item">
      {artwork.discount > 0 && (
        <div className="artg-discount-badge">{artwork.discount}% off</div>
      )}
      <button 
        className={`artg-wishlist-button ${wishlist.includes(artwork.id) ? 'artg-active' : ''}`}
        onClick={() => toggleWishlist(artwork.id)}
      >
        <FontAwesomeIcon icon={wishlist.includes(artwork.id) ? fasHeart : farHeart} className="artg-heart-icon" />
      </button>
      <img src={artwork.image} alt={artwork.title} className="artg-artwork-image" />
      <div className="artg-artwork-details">
        <div className="artg-artwork-info">
          <h3 className="artg-artwork-title">{artwork.title}</h3>
          <p className="artg-artist-name">{artwork.artist}</p>
          <div className="artg-price-container">
            <span className="artg-current-price">{formatPrice(artwork.price)}</span>
            {artwork.originalPrice > artwork.price && (
              <span className="artg-original-price">{formatPrice(artwork.originalPrice)}</span>
            )}
          </div>
          <div className="artg-rating">
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={`artg-star ${index < Math.floor(artwork.rating) ? 'artg-filled' : ''}`}
              />
            ))}
            <span className="artg-review-count">({artwork.reviews})</span>
          </div>
        </div>
        {/* Add View Details button here */}
        <button className="artg-view-details-btn" onClick={() => handleViewDetails(artwork.id)}>
          View Details
        </button>
      </div>
    </div>
  ))}
</div>

    </main>
  );
}

export default Gallery;

