import "./PlayerInfo.css";
import { useState } from "react";

const PlayerInfo = ({ IName, symbol, isActive }) => {
  const [editing, setEditing] = useState(false);
  const [PlayerName, setPlayerName] = useState(IName);

  const handleClicking = () => {
    setEditing((editing) => !editing);
  };

  const handelChangeName = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <div className={isActive ? "activePlayer" : undefined}>
      <div className="player">
        {editing ? (
          <input
            className="player-name input"
            value={PlayerName}
            onChange={handelChangeName}
          />
        ) : (
          <span className="player-name">{PlayerName}</span>
        )}
        <p className="player-symbol">{symbol}</p>
        <button className="edit-btn" onClick={handleClicking}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default PlayerInfo;
