import "./PlayerInfo.css";
import { useState } from "react";

const PlayerInfo = ({ symbol, isActive, pName, func, winner, draw }) => {
  const [editing, setEditing] = useState(false);

  const handleClicking = () => {
    setEditing((editing) => !editing);
  };

  return (
    <div className={isActive ? "activePlayer" : undefined}>
      <div className="player">
        {editing ? (
          <input
            className={
              winner || draw
                ? "player-name input disabled"
                : "player-name input"
            }
            value={pName}
            onChange={func}
            disabled={winner || draw}
          />
        ) : (
          <span className="player-name">{pName}</span>
        )}
        <p className="player-symbol">{symbol}</p>
        <button
          className={winner || draw ? "edit-btn disabled" : "edit-btn"}
          disabled={winner || draw}
          onClick={handleClicking}
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default PlayerInfo;
