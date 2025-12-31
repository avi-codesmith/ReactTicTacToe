import PlayerInfo from "./Components/PlayerInfo/PlayerInfo.jsx";
import GameBoard from "./Components/GameBoard/GameBoard.jsx";

function App() {
  return (
    <main>
      <div className="game-container active-player">
        <PlayerInfo IName="Player 1" symbol="X" />
        <PlayerInfo IName="Player 2" symbol="O" />
      </div>

      <div className="game-board">
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
