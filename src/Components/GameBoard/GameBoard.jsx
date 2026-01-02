import "./GameBoard.css";

const InitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onClickSquare, turns }) {
  let gameBoard = InitialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
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
      {gameBoard.map((row, rowIndex) => (
        <li className="rows" key={rowIndex}>
          {row.map((playerSymbol, colIndex) => (
            <ol key={colIndex} className="columns">
              <button
                onClick={() => onClickSquare(rowIndex, colIndex)}
                disabled={playerSymbol !== null}
              >
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
