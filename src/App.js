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
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const winSound = new Audio("win.mp3");
  const looseSound = new Audio("loose.mp3");

  const activePlayer = deriveActivePlayer(turns);

  let gameBoard = [...InitialGameBoard.map((array) => [...array])];
  let isWinFound = false;
  let draw = false;
  let playerName;
  let heading = "Tic Tac Toe";

  for (const turn of turns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].column];
    const second = gameBoard[combination[1].row][combination[1].column];
    const third = gameBoard[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      isWinFound = true;

      playerName = first === "×" ? player1Name : player2Name;
      heading = `🎉 ${playerName} "${first}" has won! 🎉`;

      try {
        winSound.currentTime = 0;
        winSound.play();
      } catch (e) {}
    }
  }
  if (!isWinFound && turns.length === 9) {
    draw = true;
    heading = "🤝 Game Over! It's a Draw 🤝";

    try {
      looseSound.currentTime = 0;
      looseSound.play();
    } catch (e) {}
  }

  const handlePlayer1Name = (e) => setPlayer1Name(e.target.value);
  const handlePlayer2Name = (e) => setPlayer2Name(e.target.value);

  // useEffect(() => {
  //   localStorage.setItem("player1Name", player1Name);
  // }, [player1Name]);

  // useEffect(() => {
  //   localStorage.setItem("player2Name", player2Name);
  // }, [player2Name]);

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
  }

  return (
    <>
      <header>
        <img src="game.png" />
        <h1>{heading}</h1>
      </header>

      <main>
        <div className="game-container active-player">
          <PlayerInfo
            IName="Player 1"
            symbol="×"
            isActive={activePlayer === "×"}
            pName={player1Name}
            func={handlePlayer1Name}
            winner={isWinFound}
            draw={draw}
          />

          <PlayerInfo
            IName="Player 2"
            symbol="o"
            isActive={activePlayer === "o"}
            pName={player2Name}
            func={handlePlayer2Name}
            winner={isWinFound}
            draw={draw}
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
