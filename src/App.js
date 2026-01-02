import { useState } from "react";
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import Log from "./Components/Log/Log.jsx";
import { WINING_COMBINATIONS } from "./winingCombination.js";

function deriveActivePlayer(turns) {
  let currPlayer = "×";
  if (turns.length > 0 && turns[0].player === "×") {
    currPlayer = "o";
  }

  return currPlayer;
}

function App() {
  const [turns, setTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("×");

  const activePlayer = deriveActivePlayer(turns);

  function handleActivePlayer(rowIndex, colIndex) {
    // setActivePlayer((prev) => {
    //   return prev === "×" ? "o" : "×";
    // });

    setTurns((prev) => {
      const currPlayer = deriveActivePlayer(prev);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prev,
      ];

      return updatedTurns;
    });
  }

  return (
    <>
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
          <GameBoard onClickSquare={handleActivePlayer} turns={turns} />
        </div>
      </main>
      <div class="logContainer">
        <Log turnsP={turns} />
      </div>
    </>
  );
}

export default App;
