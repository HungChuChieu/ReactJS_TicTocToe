import { useState } from "react";
import Square from "./square";

import "./index.css";
const Board = () => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsTurn, setXIsTern] = useState(true);

  const handleClick = (i) => {
    const newCells = cells.slice();
    console.log(newCells);
    if (calculateWinner(cells) || cells[i]) {
      return;
    }

    newCells[i] = xIsTurn ? "X" : "O";
    setXIsTern(!xIsTurn);
    setCells(newCells);
  };

  const renderSquare = (i) => {
    return (
      <Square
        onClick={() => {
          handleClick(i);
        }}
        value={cells[i]}
      />
    );
  };

  let status;
  const winner = calculateWinner(cells);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player: ${xIsTurn ? "X" : "O"}`;
  }
  return (
    <div className="game">
      <div  >
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">{status}</div>
    </div>
  );
};

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default Board;
