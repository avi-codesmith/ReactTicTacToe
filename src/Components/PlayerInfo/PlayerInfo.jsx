import "./PlayerInfo.css";
import { useState } from "react";

const PlayerInfo = ({ symbol, isActive, winner, draw, IName, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(IName);

  const handleClicking = () => {
    setEditing((editing) => !editing);
    if (editing) {
      onChange(symbol, playerName);
      console.log(playerName);
    }
  };

  const handlePlayerName = (event) => {
    setPlayerName(event.target.value);
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
            value={playerName}
            onChange={handlePlayerName}
            disabled={winner || draw}
          />
        ) : (
          <span className="player-name">{playerName}</span>
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
