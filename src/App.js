import { useState } from "react";
import PlayerInfo from "./Components/PlayerInfo/PlayerInfo.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";
import Log from "./Components/Log/Log.jsx";
import { WINNING_COMBINATIONS } from "./winingCombination.js";

let heading = "Tic Tac Toe";
const winSound = new Audio("win.mp3");
const looseSound = new Audio("loose.mp3");

const PLAYER = {
  "×": "Player 1",
  o: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of turns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }

  return gameBoard;
}

function deriveActivePlayer(turns) {
  let currPlayer = "×";
  if (turns.length > 0 && turns[0].player === "×") {
    currPlayer = "o";
  }
  return currPlayer;
}

function deriveWinner({ playerName, gameBoard }) {
  let isWinFound = false;

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].column];
    const second = gameBoard[combination[1].row][combination[1].column];
    const third = gameBoard[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      isWinFound = true;
      heading = `${playerName[first]} "${first}" has won`;
      try {
        winSound.currentTime = 0;
        winSound.play();
      } catch (e) {}
    }
  }
  return isWinFound;
}

function deriveDrawCondition({ isWinFound, turns }) {
  let draw = false;
  if (!isWinFound && turns.length === 9) {
    draw = true;
    heading = "🤝 Game Over! It's a Draw 🤝";

    try {
      looseSound.currentTime = 0;
      looseSound.play();
    } catch (e) {}
  }
  return draw;
}

function App() {
  const [playerName, setPlayerName] = useState(PLAYER);
  const [turns, setTurns] = useState([]);

  const activePlayer = deriveActivePlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const isWinFound = deriveWinner({ playerName, gameBoard });
  const draw = deriveDrawCondition({ isWinFound, turns });

  function handleActivePlayer(rowIndex, colIndex) {
    setTurns((prev) => {
      const currPlayer = deriveActivePlayer(prev);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prev,
      ];
    });
  }

  function playAgain() {
    setTurns([]);
    heading = "Tic Tac Toe";
  }

  function handlePlayerName(symbol, newName) {
    setPlayerName((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  }

  return (
    <>
      <header>
        <img src="game.png" alt="Game logo" />
        <h1>{heading}</h1>
      </header>

      <main>
        <div className="game-container active-player">
          <PlayerInfo
            IName={PLAYER["×"]}
            symbol="×"
            isActive={activePlayer === "×"}
            winner={isWinFound}
            draw={draw}
            onChange={handlePlayerName}
          />

          <PlayerInfo
            symbol="o"
            IName={PLAYER["o"]}
            isActive={activePlayer === "o"}
            winner={isWinFound}
            draw={draw}
            onChange={handlePlayerName}
          />
        </div>

        <div className="game-board">
          <GameBoard
            onClickSquare={handleActivePlayer}
            board={gameBoard}
            winner={isWinFound}
            draw={draw}
            replay={playAgain}
          />
        </div>
      </main>

      <div className="logContainer">
        <Log turnsP={turns} />
      </div>
    </>
  );
}

export default App;
