import { useState } from "react";
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";

function App() {
  const [activePlayer, setActivePlayer] = useState("×");

  function handleActivePlayer() {
    setActivePlayer((prev) => {
      return prev === "×" ? "o" : "×";
    });
  }

  return (
    <main>
      <div className="game-container active-player">
        <PlayerInfo
          IName="Player 1"
          symbol="×"
          isActive={activePlayer === "×"}
        />
        <PlayerInfo
          IName="Player 2"
          symbol="o"
          isActive={activePlayer === "o"}
        />
      </div>

      <div className="game-board">
        <GameBoard
          onClickSquare={handleActivePlayer}
          currPlayer={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
