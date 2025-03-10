import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faStar,
  faImage,
  faCalendarAlt,
  faPaintBrush,
  faDollarSign,
  faChevronDown,
  faChevronUp,
  faSearch,
  faFilter,
  faSortAmountDown,
  faSortAmountUp
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Artists.css';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [expandedArtist, setExpandedArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      const dummyArtists = [
        {
          id: 1,
          name: 'ritika rai',
          image: './images1.jpg',
          shortBio: 'Abstract artist with a passion for bold colors and geometric shapes.',
          fullBio: 'Emma Johnson is a renowned abstract artist known for her vibrant use of color and intricate geometric compositions. With over 15 years of experience, her work has been featured in galleries across Europe and North America.',
          category: 'Abstract',
          rating: 4.8,
          totalSold: 127,
          joinDate: '2015-03-15'
          // ,
          // featuredWorks: [
          //   { id: 1, title: 'Geometric Harmony', image: 'https://placekitten.com/200/200' },
          //   { id: 2, title: 'Color Explosion', image: 'https://placekitten.com/201/201' },
          //   { id: 3, title: 'Abstract Landscape', image: 'https://placekitten.com/202/202' }
          // ]
        },
        {
          id: 2,
          name: 'kirti singh',
          image: './images3.jpg',
          shortBio: 'Contemporary painter specializing in urban landscapes and cityscapes.',
          fullBio: 'Michael Chen is a rising star in the world of contemporary art, known for his stunning depictions of urban landscapes. His unique style blends realism with a touch of impressionism, capturing the energy and spirit of modern cities.',
          category: 'Contemporary',
          rating: 4.6,
          totalSold: 89,
          joinDate: '2017-07-22'
          // ,
          // featuredWorks: [
          //   { id: 4, title: 'Neon Nights', image: 'https://placekitten.com/203/203' },
          //   { id: 5, title: 'Rush Hour', image: 'https://placekitten.com/204/204' },
          //   { id: 6, title: 'Skyscraper Dreams', image: 'https://placekitten.com/205/205' }
          // ]
        },
        {
          id: 3,
          name: 'Sophia Patel',
          image: './images5.jpg',
          shortBio: 'Traditional artist specializing in intricate mandala designs.',
          fullBio: 'Sophia Patel is a master of mandala art, creating stunning, intricate designs that blend traditional techniques with modern aesthetics. Her work is inspired by her Indian heritage and has gained international recognition for its beauty and complexity.',
          category: 'Traditional',
          rating: 4.9,
          totalSold: 215,
          joinDate: '2014-01-10'
          // ,
          // featuredWorks: [
          //   { id: 7, title: 'Cosmic Mandala', image: 'https://placekitten.com/206/206' },
          //   { id: 8, title: 'Floral Symmetry', image: 'https://placekitten.com/207/207' },
          //   { id: 9, title: 'Sacred Geometry', image: 'https://placekitten.com/208/208' }
          // ]
        },
        {
          id: 4,
          name: 'Vansh',
          image: './images6.jpg',
          shortBio: 'Surrealist painter exploring dreams and the subconscious mind.',
          fullBio: 'Lucas Dubois is a contemporary surrealist whose paintings transport viewers into dreamlike worlds. Drawing inspiration from the works of Salvador Dalí and René Magritte, Lucas creates thought-provoking pieces that challenge perception and reality.',
          category: 'Surrealism',
          rating: 4.7,
          totalSold: 103,
          joinDate: '2016-09-05'
          // ,
          // featuredWorks: [
          //   { id: 10, title: 'Melting Clocks', image: 'https://placekitten.com/209/209' },
          //   { id: 11, title: 'The Floating City', image: 'https://placekitten.com/210/210' },
          //   { id: 12, title: 'Dream Sequence', image: 'https://placekitten.com/211/211' }
          // ]
        },
        {
          id: 5,
          name: 'Sachin Patel',
          image: './sachin.jpg',
          shortBio: 'Pop art enthusiast creating vibrant and iconic celebrity portraits.',
          fullBio: 'Olivia Clark is a modern pop artist who brings a fresh perspective to the genre. Her bold, colorful portraits of cultural icons and celebrities have earned her a dedicated following and numerous commissions from high-profile clients.',
          category: 'Pop Art',
          rating: 4.5,
          totalSold: 78,
          joinDate: '2018-11-30'
          // ,
          // featuredWorks: [
          //   { id: 13, title: 'Neon Marilyn', image: 'https://placekitten.com/212/212' },
          //   { id: 14, title: 'Pop Culture Collage', image: 'https://placekitten.com/213/213' },
          //   { id: 15, title: 'Retro Remix', image: 'https://placekitten.com/214/214' }
          // ]
        },
        {
          id: 6,
          name: 'Reiine Iangar',
          image: './reiine.jpg',
          shortBio: 'Master of traditional Japanese ink wash painting and calligraphy.',
          fullBio: 'Hiroshi Tanaka is a highly respected artist in the world of traditional Japanese art. With over 40 years of experience, he has perfected the delicate techniques of sumi-e (ink wash painting) and shodo (calligraphy), creating works of timeless beauty.',
          category: 'Traditional',
          rating: 4.9,
          totalSold: 189,
          joinDate: '2010-05-18'
          // ,
          // featuredWorks: [
          //   { id: 16, title: 'Zen Garden', image: 'https://placekitten.com/215/215' },
          //   { id: 17, title: 'Cherry Blossoms', image: 'https://placekitten.com/216/216' },
          //   { id: 18, title: 'Mountain Mist', image: 'https://placekitten.com/217/217' }
          // ]
        }
      ];
      setArtists(dummyArtists);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch artists. Please try again later.');
      setLoading(false);
    }
  };

  const handleExpandArtist = (artistId) => {
    setExpandedArtist(expandedArtist === artistId ? null : artistId);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedArtists = artists
    .filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(artist => filterCategory === 'all' || artist.category === filterCategory)
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'rating') {
        comparison = b.rating - a.rating;
      } else if (sortBy === 'totalSold') {
        comparison = b.totalSold - a.totalSold;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  if (loading) {
    return <div className="art-loading">Loading artists...</div>;
  }

  if (error) {
    return <div className="art-error">{error}</div>;
  }

  return (
    <div className="art-artists-container">
      <h1 className="art-title">Discover Our Talented Artists</h1>
      <div className="art-filters">
        <div className="art-search">
          <FontAwesomeIcon icon={faSearch} className="art-search-icon" />
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={handleSearch}
            className="art-search-input"
          />
        </div>
        <div className="art-filter">
          <FontAwesomeIcon icon={faFilter} className="art-filter-icon" />
          <select value={filterCategory} onChange={handleFilterChange} className="art-filter-select">
            <option value="all">All Categories</option>
            <option value="Abstract">Abstract</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Traditional">Traditional</option>
            <option value="Surrealism">Surrealism</option>
            <option value="Pop Art">Pop Art</option>
          </select>
        </div>
        <div className="art-sort">
          <FontAwesomeIcon icon={faSortAmountDown} className="art-sort-icon" />
          <select value={sortBy} onChange={handleSortChange} className="art-sort-select">
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="totalSold">Total Sold</option>
          </select>
          <button onClick={toggleSortOrder} className="art-sort-order">
            <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAmountUp : faSortAmountDown} />
          </button>
        </div>
      </div>
      <div className="art-artists-grid">
        {filteredAndSortedArtists.map(artist => (
          <div key={artist.id} className="art-artist-card">
            <img src={artist.image} alt={artist.name} className="art-artist-image" />
            <h2 className="art-artist-name">{artist.name}</h2>
            <p className="art-artist-category">{artist.category}</p>
            <p className="art-artist-short-bio">{artist.shortBio}</p>
            <div className="art-artist-stats">
              <span className="art-artist-rating">
                <FontAwesomeIcon icon={faStar} className="art-star-icon" />
                {artist.rating.toFixed(1)}
              </span>
              <span className="art-artist-sold">
                <FontAwesomeIcon icon={faPaintBrush} className="art-brush-icon" />
                {artist.totalSold} sold
              </span>
            </div>
            <button
              className="art-view-details"
              onClick={() => handleExpandArtist(artist.id)}
            >
              {expandedArtist === artist.id ? (
                <>
                  <span>Hide Details</span>
                  <FontAwesomeIcon icon={faChevronUp} className="art-chevron-icon" />
                </>
              ) : (
                <>
                  <span>View Details</span>
                  <FontAwesomeIcon icon={faChevronDown} className="art-chevron-icon" />
                </>
              )}
            </button>
            {expandedArtist === artist.id && (
              <div className="art-artist-details">
                <p className="art-artist-full-bio">{artist.fullBio}</p>
                <div className="art-artist-info">
                  <p>
                    <FontAwesomeIcon icon={faCalendarAlt} className="art-info-icon" />
                    Joined: {new Date(artist.joinDate).toLocaleDateString()}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faDollarSign} className="art-info-icon" />
                    Total Sales: Rs. {(artist.totalSold * 100).toLocaleString()} (estimated)
                  </p>
                </div>
                {/* <h3 className="art-featured-works-title">Featured Works</h3>
                <div className="art-featured-works">
                  {artist.featuredWorks.map(work => (
                    <div key={work.id} className="art-featured-work">
                      <img src={work.image} alt={work.title} className="art-work-image" />
                      <p className="art-work-title">{work.title}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;

