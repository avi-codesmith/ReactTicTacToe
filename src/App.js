import PlayerInfo from "./Components/PlayerInfo/PlayerInfo.jsx";
import GameBoard from "./Components/PlayerInfo/GameBoard/GameBoard.jsx";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function ChangeSymbol() {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));
  }

  return (
    <main>
      <div className="game-container">
        <PlayerInfo IName="Player 1" symbol="X" />
        <PlayerInfo IName="Player 2" symbol="O" />
      </div>

      <div className="game-board">
        <GameBoard onSelect={ChangeSymbol} activePlayer={activePlayer} />
      </div>
    </main>
  );
}

export default App;
