import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./CardRevealAnimation.module.css";

import serra_card from "../assets/images/serra_card.png";
import serra_backstory from "../assets/images/serra_backstory.png"; // Your backstory image

const CardRevealAnimation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const character = location.state?.character;

  const [stage, setStage] = useState("loading");
  const [showBackstory, setShowBackstory] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("splash"), 3000);
    const timer2 = setTimeout(() => setStage("card"), 6000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleExploreMore = () => {
    navigate(`/character/${character.code}`, { state: { character } });
  };

  const handleBackstoryClick = () => {
    setShowBackstory(true);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    if (isFullscreen) return;
    setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    if (isFullscreen) return;
    setZoomLevel((prev) => Math.max(prev - 0.2, 1));
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen((prev) => !prev);
  };

  // Decide which image to display
  const imageSrc = showBackstory ? serra_backstory : serra_card;

  return (
    <div className={styles.animationContainer}>
      {stage === "loading" && <span className={styles.loader}></span>}

      {stage === "splash" && (
        <div className={styles.splash}>✨ REVEALING ✨</div>
      )}

      {stage === "card" && (
        <div className={styles.card}>
          {/* Image with zoom and overlay buttons */}
          <div className={styles.imageContainer}>
            {/* Zoom Buttons and Fullscreen Toggle */}
            {!isFullscreen && (
              <div className={styles.zoomButtons}>
                <button
                  className={styles.zoomButton}
                  onClick={handleFullscreenToggle}
                >
                  +
                </button>
              </div>
            )}
            {/* Image */}
            <img
              src={imageSrc}
              alt="Character"
              className={styles.characterImage}
              style={{
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button className={styles.retroButton} onClick={handleExploreMore}>
              Explore More
            </button>
            <button className={styles.retroButton}>Weapons</button>
            <button
              className={styles.retroButton}
              onClick={() => setShowBackstory((prev) => !prev)}
            >
              {showBackstory ? "Main Card" : "Backstory"}
            </button>

            <button className={styles.retroButton}>Add to Collection</button>
          </div>
        </div>
      )}

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className={styles.fullscreenOverlay}>
          {/* Close button */}
          <button
            className={styles.closeButton}
            onClick={() => setIsFullscreen(false)}
          >
            &times;
          </button>
          {/* Fullscreen image */}
          <img
            src={imageSrc}
            alt="Character"
            className={styles.fullscreenImage}
            style={{
              // Make image fill the viewport while maintaining aspect ratio
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardRevealAnimation;
