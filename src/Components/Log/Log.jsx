import "./Log.css";
export default function Log({ turnsP }) {
  return (
    <ol className="log">
      {turnsP.map((turn, index) => {
        return (
          <li key={index}>
            {turn.player} selected {turn.square.row},{turn.square.col}
          </li>
        );
      })}
    </ol>
  );
}
