import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPen,
  faCamera,
  faSave,
  faTimes,
  faPhone,
  faMapMarkerAlt,
  faBirthdayCake,
  faHistory,
  faUserTag,
  faPalette,
  faShoppingBag,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Profile.css';

function Profile() {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    userType: '',
    interests: [],
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Your Profile | Art Gallery";
    fetchUserData();
  }, [user]);

  const fetchUserData = () => {
    setIsLoading(true);
    // Simulating API call to fetch user data
    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('users')).find(u => u.id === user.id);
      if (userData) {
        setProfileData({
          name: userData.name || '',
          email: userData.email || '',
          bio: userData.bio || '',
          profilePicture: userData.profilePicture || '',
          phoneNumber: userData.phoneNumber || '',
          address: userData.address || '',
          dateOfBirth: userData.dateOfBirth || '',
          userType: userData.userType || 'collector',
          interests: userData.interests || [],
          socialLinks: userData.socialLinks || {
            facebook: '',
            twitter: '',
            instagram: '',
          },
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      socialLinks: {
        ...prevData.socialLinks,
        [name]: value
      }
    }));
  };

  const handleInterestChange = (interest) => {
    setProfileData(prevData => ({
      ...prevData,
      interests: prevData.interests.includes(interest)
        ? prevData.interests.filter(i => i !== interest)
        : [...prevData.interests, interest]
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Simulating API call to update user profile
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedUser = {
        ...user,
        ...profileData,
        profilePicture: newProfilePicture || profileData.profilePicture
      };

      // Update user in local storage
      const users = JSON.parse(localStorage.getItem('users'));
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      updateUser(updatedUser);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      console.log('Profile updated:', updatedUser);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Your Profile</h1>
        {!isEditing && (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <FontAwesomeIcon icon={faPen} /> Edit Profile
          </button>
        )}
      </div>
      {error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </div>
      )}
      {success && (
        <div className="success-message">
          <FontAwesomeIcon icon={faCheckCircle} /> {success}
        </div>
      )}
      <div className="profile-content">
        <div className="profile-picture-container">
          <img
            src={newProfilePicture || profileData.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="profile-picture"
          />
          {isEditing && (
            <label htmlFor="profile-picture-upload" className="profile-picture-upload">
              <FontAwesomeIcon icon={faCamera} />
              <input
                type="file"
                id="profile-picture-upload"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">
              <FontAwesomeIcon icon={faPhone} className="input-icon" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">
              <FontAwesomeIcon icon={faBirthdayCake} className="input-icon" />
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={profileData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userType">
              <FontAwesomeIcon icon={faUserTag} className="input-icon" />
              User Type
            </label>
            <div className="user-type-options">
              <label className={`user-type-option ${profileData.userType === 'collector' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="collector"
                  checked={profileData.userType === 'collector'}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <FontAwesomeIcon icon={faShoppingBag} />
                Collector
              </label>
              <label className={`user-type-option ${profileData.userType === 'artist' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="artist"
                  checked={profileData.userType === 'artist'}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <FontAwesomeIcon icon={faPalette} />
                Artist
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Interests</label>
            <div className="interests-options">
              {['Painting', 'Sculpture', 'Photography', 'Digital Art', 'Mixed Media'].map(interest => (
                <label key={interest} className="interest-option">
                  <input
                    type="checkbox"
                    checked={profileData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    disabled={!isEditing}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Social Links</label>
            <div className="social-links">
              <div className="social-link-input">
                <FontAwesomeIcon icon={['fab', 'facebook']} className="social-icon" />
                <input
                  type="url"
                  name="facebook"
                  value={profileData.socialLinks.facebook}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                  placeholder="Facebook URL"
                  className="input-field"
                />
              </div>
              <div className="social-link-input">
                <FontAwesomeIcon icon={['fab', 'twitter']} className="social-icon" />
                <input
                  type="url"
                  name="twitter"
                  value={profileData.socialLinks.twitter}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                  placeholder="Twitter URL"
                  className="input-field"
                />
              </div>
              <div className="social-link-input">
                <FontAwesomeIcon icon={['fab', 'instagram']} className="social-icon" />
                <input
                  type="url"
                  name="instagram"
                  value={profileData.socialLinks.instagram}
                  onChange={handleSocialLinkChange}
                  disabled={!isEditing}
                  placeholder="Instagram URL"
                  className="input-field"
                />
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="button-group">
              <button type="submit" className="save-button">
                <FontAwesomeIcon icon={faSave} /> Save Changes
              </button>
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="profile-footer">
        <Link to="/order-history" className="order-history-link">
          <FontAwesomeIcon icon={faHistory} /> View Order History
        </Link>
      </div>
    </div>
  );
}

export default Profile;

