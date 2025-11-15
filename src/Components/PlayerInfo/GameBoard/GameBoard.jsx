import { useState } from "react";
import "./GameBoard.css";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelect, activePlayer }) {
  onSelect();
  const [GameBoard, setGameBoard] = useState(initialGameBoard);
  const HandelInputSymbol = (rowIndex, colIndex) => {
    setGameBoard((prev) => {
      const UpdatedGameBoard = prev.map((row) => [...row]);
      if (UpdatedGameBoard[rowIndex][colIndex] === null) {
        console.log(activePlayer + "inner");

        UpdatedGameBoard[rowIndex][colIndex] = activePlayer;
      }
      return UpdatedGameBoard;
    });
  };

  return (
    <>
      {GameBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="rows">
          {row.map((symbol, colIndex) => (
            <div key={colIndex} className="blocks">
              <button onClick={() => HandelInputSymbol(rowIndex, colIndex)}>
                {symbol}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
