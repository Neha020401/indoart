import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ArtistProfile.css';

function ArtistProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    // Fetch artist details and artworks
    // For now, we'll use dummy data
    const dummyArtist = {
      id: id,
      name: 'Jane Doe',
      bio: 'Abstract artist with a passion for bold colors',
      image: 'https://example.com/jane-doe.jpg',
    };
    setArtist(dummyArtist);

    const dummyArtworks = [
      { id: 1, title: 'Abstract Harmony', price: 500, image: 'https://example.com/abstract-harmony.jpg' },
      { id: 2, title: 'Colorful Chaos', price: 750, image: 'https://example.com/colorful-chaos.jpg' },
      { id: 3, title: 'Geometric Dreams', price: 600, image: 'https://example.com/geometric-dreams.jpg' },
    ];
    setArtworks(dummyArtworks);
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artist-profile">
      <div className="artist-info">
        <img src={artist.image} alt={artist.name} className="artist-image" />
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>
      </div>
      <div className="artist-artworks">
        <h2>Artworks by {artist.name}</h2>
        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <div key={artwork.id} className="artwork-card">
              <img src={artwork.image} alt={artwork.title} />
              <h3>{artwork.title}</h3>
              <p className="price">${artwork.price}</p>
              <Link to={`/product/${artwork.id}`} className="view-details">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistProfile;

