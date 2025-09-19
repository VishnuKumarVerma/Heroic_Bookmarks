import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./GamePage.css";

const GamePage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [pos, setPos] = useState([0, 0]);
  const [foundItems, setFoundItems] = useState([]);
  const [data, setData] = useState(null);
  const [clue, setClue] = useState(null);

  useEffect(() => {
    fetch(`/gameData/${code}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Game data not found");
        return res.json();
      })
      .then(setData)
      .catch(() => alert("Game data not found"));
  }, [code]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowUp") move("up");
      if (e.key === "ArrowDown") move("down");
      if (e.key === "ArrowLeft") move("left");
      if (e.key === "ArrowRight") move("right");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [data]);

  useEffect(() => {
    if (data && foundItems.length === data.items.length) {
      setTimeout(() => {
        alert(`🎉 You've completed the quest of ${code}!`);
        navigate(`/character/${code}`);
      }, 1000);
    }
  }, [foundItems, data, code, navigate]);

  if (!data) return <div>Loading game...</div>;

  const move = (dir) => {
    setPos(([x, y]) => {
      const newPos = {
        up: [x, Math.max(0, y - 1)],
        down: [x, Math.min(data.mapSize[1] - 1, y + 1)],
        left: [Math.max(0, x - 1), y],
        right: [Math.min(data.mapSize[0] - 1, x + 1), y],
      }[dir];
      checkItem(newPos);
      return newPos;
    });
  };

  const checkItem = ([x, y]) => {
    data.items.forEach((item, i) => {
      if (item.pos[0] === x && item.pos[1] === y && !foundItems.includes(i)) {
        setFoundItems((prev) => [...prev, i]);
        setClue(item.clue);
        setTimeout(() => setClue(null), 4000);
      }
    });
  };

  const nextItem = data.items.find((_, i) => !foundItems.includes(i));
  const distance = nextItem
    ? Math.abs(pos[0] - nextItem.pos[0]) + Math.abs(pos[1] - nextItem.pos[1])
    : null;

  return (
    <>
      {/* <div className={`background-effect ${themeClass}`}></div> */}
      <div className="minigame-container">
        <h2>{code.toUpperCase()}'s Quest</h2>

        <p className="score">
          Items Found: {foundItems.length} / {data.items.length}
        </p>

        {distance !== null && (
          <p className="radar">Next Item Distance: {distance} tiles</p>
        )}

        <div className="map">
          {Array.from({ length: data.mapSize[1] }, (_, row) => (
            <div key={row} className="row">
              {Array.from({ length: data.mapSize[0] }, (_, col) => {
                const isPlayer = pos[0] === col && pos[1] === row;
                const isFound = data.items.some(
                  (item, i) =>
                    item.pos[0] === col &&
                    item.pos[1] === row &&
                    foundItems.includes(i)
                );
                return (
                  <div className={`cell ${isFound ? "found" : ""}`} key={col}>
                    {isPlayer && (
                      <h1>?</h1>
                    )}
                    {!isPlayer && isFound && (
                      <img
                        src="/gameData/serra_card.png"
                        className="item"
                        alt="item"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {clue && <div className="clue-popup">💡 {clue}</div>}

        <div className="controls">
          <div>
            <button onClick={() => move("up")}>⬆</button>
          </div>
          <div>
            <button onClick={() => move("left")}>⬅</button>
            <button onClick={() => move("down")}>⬇</button>
            <button onClick={() => move("right")}>➡</button>
          </div>
          <div className="actions">
            <button
              onClick={() => {
                setPos(data.startPos);
                setFoundItems([]);
              }}
            >
              🔁 Reset
            </button>
            <button onClick={() => navigate(`/character/${code}`)}>
              🚪 Exit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
