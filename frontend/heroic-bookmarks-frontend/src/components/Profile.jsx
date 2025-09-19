import React from "react";
import "./Profile.css";

import profile from "../assets/images/profile_mask.svg";

const Profile = () => {

  const handleHome = () => {
    window.location.href = "/";
  };

  const handleCollections = () => {
    window.location.href = "/collections";
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Retro Navbar */}
        <nav className="retro-navbar">
          <button className="nav-button" onClick={handleHome}>Home</button>
          <button className="nav-button">Edit</button>
          <button className="nav-button" onClick={handleCollections}>Collections</button>
        </nav>
        <div className="profile-card">
          <div className="profile-image-wrapper">
            <img src={profile} alt="User Profile" className="profile-image" />
          </div>
          <h2 className="username">RetroUser123</h2>
          <div className="profile-info">
            <p>Location: Retro City</p>
            <p>Member Since: 1985</p>
            <p>Bio: Lover of vintage vibes and pixel art!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
