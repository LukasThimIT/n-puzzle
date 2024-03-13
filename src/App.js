import { useState } from "react";

function Square({value, onSquareClick}){
  return (<button className="square" onClick={onSquareClick}>
              {value}
          </button>);
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null)); 
  
  function handleClick(i){
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return(
    <>
      <div class="board-row">
        <Square value={squares[0]} onSquareClick={0} />
        <Square value={squares[1]}/>
        <Square value={squares[2]}/>
      </div>
      <div class="board-row">
        <Square value={squares[3]}/>
        <Square value={squares[4]}/>
        <Square value={squares[5]}/>
      </div>
      <div class="board-row">
        <Square value={squares[6]}/>
        <Square value={squares[7]}/>
        <Square value={squares[8]}/>
      </div>
    </>
  );
  }
