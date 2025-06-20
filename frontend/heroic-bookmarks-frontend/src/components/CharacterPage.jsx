import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./CharacterPage.module.css";
import dot from "../assets/images/knowMoreDot.gif";
import grabButton from "../assets/images/grabNowButton.svg";
import characterImage from "../assets/images/character.png";

function CharacterPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [close, setClose] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);
  const [displayedInfo, setDisplayedInfo] = useState("");

  const characterInfo = ``;
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleGrabNow = async () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: `/character/CHAR001` } });
      return;
    }

    try {
      await axios.post("http://localhost:8080/collections/save", {
        email: localStorage.getItem("userEmail"),
        code: "CHAR001",
      });
      alert("Character saved to your collection!");
    } catch (err) {
      alert("Error saving character: " + err.response?.data || err.message);
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const typeNext = () => {
      if (currentIndex < characterInfo.length) {
        setDisplayedInfo((prev) => prev + characterInfo.charAt(currentIndex));
        currentIndex++;
        setTimeout(typeNext, 50);
      }
    };
    typeNext();
    return () => clearTimeout(typeNext);
  }, []);

  useEffect(() => {
    if (close) return;
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, [close]);

  const handleContinue = () => navigate("/signup");
  const handleClose = () => {
    setShowPopup(false);
    setClose(true);
  };

  const handleDetailsOpen = (dotId) => setHoveredDot(dotId);
  const handleDetailsClose = () => setHoveredDot(null);

  return (
    <div className={styles.characterPage}>
      <div className={styles.particles}></div>
      <div className={styles.bgEffect}></div>
      <div className={styles.characterContainer}>
        <div className={styles.imageWrapper}>
          <div className={styles.floatingParticles}>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
            <div className={styles.particle}></div>
          </div>

          <div className={styles.imageResponsiveWrapper}>
            <img
              src={characterImage}
              alt="Character"
              className={styles.characterImage}
            />

            <div className={styles.dotContainer}>
              {["one", "two", "three"].map((dotId) => (
                <div
                  key={dotId}
                  className={`${styles.dot} ${
                    styles[
                      `dot${dotId.charAt(0).toUpperCase() + dotId.slice(1)}`
                    ]
                  }`}
                  onMouseEnter={() => handleDetailsOpen(dotId)}
                  onMouseLeave={handleDetailsClose}
                >
                  <img src={dot} alt="" />
                  {hoveredDot === dotId && (
                    <div
                      className={
                        styles[
                          `dotDetail${
                            dotId.charAt(0).toUpperCase() + dotId.slice(1)
                          }`
                        ]
                      }
                    >
                      <p>
                        {dotId === "one" && (
                          <>
                            <span>Jupiter's moons</span> became bases to many{" "}
                            <span>species</span> during the{" "}
                            <span>Climate Wars</span>...
                          </>
                        )}
                        {dotId === "two" && (
                          <>
                            <span>The Glow Lance</span> is the favored weapon of
                            the Feline <span>Ultimatus</span>...
                          </>
                        )}
                        {dotId === "three" && (
                          <>
                            <span>Sierra</span> does not live in a home, instead
                            she has a <span>habitat</span>...
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.topRightSections}>
              {isLoggedIn ? (
                <>
                  <button onClick={() => navigate("/profile")}>👤</button>
                  <button onClick={() => navigate("/collection")}>📚</button>
                  <button onClick={() => navigate("/activity")}>🕘</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate("/login")}>Login</button>
                  <button onClick={() => navigate("/signup")}>Signup</button>
                </>
              )}
            </div>

            <div className={styles.bottomRight} onClick={handleGrabNow}>
              <img src={grabButton} alt="Grab Now" />
            </div>
          </div>
        </div>

        <div className={styles.mainInfo}>
          {displayedInfo.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        {showPopup && (
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={handleClose}>
              close
            </button>
            <h3>Want to save this character?</h3>
            <p>Please sign in to store it in your collection.</p>
            <button onClick={handleContinue}>Continue</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterPage;
