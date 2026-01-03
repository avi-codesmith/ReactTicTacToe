import { useState } from "react";
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import Log from "./Components/Log/Log.jsx";
import { WINNING_COMBINATIONS } from "./winingCombination.js";

const InitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

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

  let gameBoard = InitialGameBoard;

  let winner = null;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
      alert(winner + " won");
    }
  }

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
          <GameBoard onClickSquare={handleActivePlayer} board={gameBoard} />
        </div>
      </main>
      <div class="logContainer">
        <Log turnsP={turns} />
      </div>
    </>
  );
}

export default App;
