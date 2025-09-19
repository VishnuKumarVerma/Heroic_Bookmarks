import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Collections.css";

import serra_card from "../assets/images/serra_card.png";

const Collections = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userEmail");
    if (!userId) return;

    axios
      .get(`http://localhost:8080/api/collection/${userId}`)
      .then((res) => setCharacters(res.data))
      .catch((err) => console.error("Error loading collection", err));
  }, []);

  return (
    <div className="collection-container">
      <h2>Your Character Collection</h2>
      <div className="card-grid">
        {characters.map((char) => (
          <div key={char.code} className="collection-card">
            <img src={serra_card} alt={char.name} />
            <h3>{char.name}</h3>
            <p>{char.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
