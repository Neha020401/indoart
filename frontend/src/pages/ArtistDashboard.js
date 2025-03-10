import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ArtistDashboard.css';

function ArtistDashboard() {
  const [artworks, setArtworks] = useState([]);
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [orders, setOrders] = useState([]); // Initially empty order history
  const { user } = useAuth();

  useEffect(() => {
    // Fetch artist's artworks and orders (dummy data for now)
    const dummyArtworks = [
      { id: 1, title: 'Abstract Harmony', price: 500, image: 'https://example.com/abstract-harmony.jpg' },
      { id: 2, title: 'Serene Landscape', price: 750, image: 'https://example.com/serene-landscape.jpg' },
    ];
    const dummyOrders = [];
    setArtworks(dummyArtworks);
    setOrders(dummyOrders); // Empty order history initially
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtwork({ ...newArtwork, [name]: value });
  };

  const handleImageUpload = (e) => {
    setNewArtwork({ ...newArtwork, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArtworkWithId = { ...newArtwork, id: artworks.length + 1 };
    setArtworks([...artworks, newArtworkWithId]);
    setNewArtwork({ title: '', description: '', price: '', category: '', image: null });
  };

  return (
    <div className="artist-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'Artist'}</h1>
        <p>Your creative space to manage your artworks and orders.</p>
      </div>

      {/* Upload Artwork Section */}
      <section className="upload-artwork">
        <h2>Upload New Artwork</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newArtwork.title}
              onChange={handleInputChange}
              placeholder="Enter artwork title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newArtwork.description}
              onChange={handleInputChange}
              placeholder="Describe your artwork"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newArtwork.price}
              onChange={handleInputChange}
              placeholder="Enter artwork price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={newArtwork.category}
              onChange={handleInputChange}
              placeholder="Enter artwork category"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
          </div>
          <button type="submit">Upload Artwork</button>
        </form>
      </section>

      {/* Artworks List Section */}
      <section className="artwork-list">
        <h2>Your Artworks</h2>
        <div className="artwork-grid">
          {artworks.length === 0 ? (
            <div className="no-artworks">
              <p>No artworks uploaded yet. Upload your first artwork!</p>
            </div>
          ) : (
            artworks.map((artwork) => (
              <div key={artwork.id} className="artwork-card">
                <img src={artwork.image} alt={artwork.title} />
                <h3>{artwork.title}</h3>
                <p>Price: ${artwork.price}</p>
                <Link to={`/product/${artwork.id}`} className="view-artwork-btn">View Details</Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Order History Section */}
      <section className="order-history">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders have been placed yet.</p>
          </div>
        ) : (
          <ul className="order-list">
            {orders.map((order, index) => (
              <li key={index} className="order-item">
                <p>Order #{order.id}</p>
                <p>Amount: ${order.amount}</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default ArtistDashboard;
