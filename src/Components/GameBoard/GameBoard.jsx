import "./GameBoard.css";
import { useState } from "react";

const InitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const [symbol, setSymbol] = useState(InitialGameBoard);

function handleSymbol() {
  setSymbol((prev) => {});
}

function GameBoard() {
  return (
    <>
      {InitialGameBoard.map((row, rowIndex) => (
        <li className="rows" key={rowIndex}>
          {row.map((playerSymbol, colIndex) => (
            <ol key={colIndex} className="columns">
              <button>{playerSymbol}</button>
            </ol>
          ))}
        </li>
      ))}
    </>
  );
}

export default GameBoard;
