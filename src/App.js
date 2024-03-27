import {useState} from "react"

function Square ({value, onSquareClick, index}) {

  return <button className="border-solid border-[1px] border-black w-[100px] h-[100px]" onClick={onSquareClick} >
    <p className={`text-3xl font-bold ${value === "X" ? "text-green-600" : "text-red-600"}`}>{value}</p></button>
}
export default function Board () {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = findWinner(squares);
  let status;
  if (winner) {
    status = "Game Over! The Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {

    if(squares[i] || findWinner(squares)){
      return;
    }

    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
  <>
  <div className="flex flex-col items-center">
    <h1 className="text-center text-5xl text-blue-900 font-bold my-10">TIC-TAC-TOE</h1>
    <div className="text-3xl text-center">{status}</div>
      <div className="flex flex-wrap w-[300px] mx-auto mt-5">
      {squares.map((value, index) => (
            <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
          ))}
      </div>
      <button className="w-[100px] h-[50px] bg-blue-900 text-white font-bold rounded-lg mt-10" onClick={resetGame}>Reset Game</button>
      </div>
  </>
  )
}

function findWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

