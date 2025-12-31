import "./GameBoard.css";
import { useState } from "react";

const InitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onClickSquare, currPlayer }) {
  const [gameBoard, setGameBoard] = useState(InitialGameBoard);

  function handleGameboard(rowIndex, colIndex) {
    setGameBoard((prev) => {
      const updatedGameBoard = [...prev.map((innerItems) => [...innerItems])];
      if (updatedGameBoard[rowIndex][colIndex] !== null) return prev;
      updatedGameBoard[rowIndex][colIndex] = currPlayer;
      return updatedGameBoard;
    });

    onClickSquare();
  }

  return (
    <>
      {gameBoard.map((row, rowIndex) => (
        <li className="rows" key={rowIndex}>
          {row.map((playerSymbol, colIndex) => (
            <ol key={colIndex} className="columns">
              <button onClick={() => handleGameboard(rowIndex, colIndex)}>
                {playerSymbol}
              </button>
            </ol>
          ))}
        </li>
      ))}
    </>
  );
}

export default GameBoard;
