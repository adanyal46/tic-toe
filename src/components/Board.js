import React, { useState } from "react";
import CalculateWinner from "./calculateWinner";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const minimax = (squares, depth, isMaximizing) => {
    const winner = CalculateWinner(squares);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (squares.every((square) => square)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "O";
          const evaluation = minimax(squares, depth + 1, false); // Renamed here
          squares[i] = null;
          maxEval = Math.max(maxEval, evaluation); // And here
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
          squares[i] = "X";
          const evaluation = minimax(squares, depth + 1, true); // Renamed here
          squares[i] = null;
          minEval = Math.min(minEval, evaluation); // And here
        }
      }
      return minEval;
    }
  };
  const makeBestMove = (squares) => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = "O";
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };
  const handleClick = (index) => {
    if (squares[index] || CalculateWinner(squares)) return;

    const squaresCopy = squares.slice();
    squaresCopy[index] = "X";
    setSquares(squaresCopy);

    if (
      !CalculateWinner(squaresCopy) &&
      !squaresCopy.every((square) => square)
    ) {
      const bestMove = makeBestMove(squaresCopy);
      squaresCopy[bestMove] = "O";
      setSquares(squaresCopy);
    }
  };
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = CalculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every((square) => square)) {
    status = "Game Draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map((i) => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map((i) => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map((i) => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

const Square = ({ value, onClick }) => {
  console.log(value);

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const TicTacToe = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default TicTacToe;
