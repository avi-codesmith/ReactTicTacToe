import "./GameBoard.css";

function GameBoard({ onClickSquare, board, winner, draw, replay }) {
  // const [gameBoard, setGameBoard] = useState(InitialGameBoard);

  // function handleGameboard(rowIndex, colIndex) {
  //   setGameBoard((prev) => {
  //     const updatedGameBoard = [...prev.map((innerItems) => [...innerItems])];
  //     if (updatedGameBoard[rowIndex][colIndex] !== null) return prev;
  //     updatedGameBoard[rowIndex][colIndex] = currPlayer;
  //     return updatedGameBoard;
  //   });

  //   onClickSquare();

  return (
    <>
      {board.map((row, rowIndex) => (
        <li className="rows" key={rowIndex}>
          {row.map((playerSymbol, colIndex) => (
            <ol
              key={colIndex}
              className={winner || draw ? "columns disabled" : "columns"}
            >
              <button
                className={winner || draw ? "disabled" : undefined}
                onClick={() => onClickSquare(rowIndex, colIndex)}
                disabled={playerSymbol !== null || winner}
              >
                {playerSymbol}
              </button>
            </ol>
          ))}
        </li>
      ))}
      <button
        className={winner || draw ? "gameOverBtn show" : "gameOverBtn"}
        onClick={replay}
      >
        let's play again!
      </button>
    </>
  );
}

export default GameBoard;
