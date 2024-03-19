import { useState } from "react";

function Square({value, onSquareClick}){
  return (<button className="square" onClick={onSquareClick}>
              {value}
          </button>);
}

export default function Board({onPlay}){
  const [squares, setSquares] = useState(render_board(4,4)); 
  
  function handleClick(i){
    console.log(i);
    return i;
    if (squares[i] != 0){ //kolla att squares[i] inte är lika med den tomma rutan
      console.log(squares);
      return "hej";
    }
    const nextSquares = squares.slice();
    onPlay(nextSquares, false);
  }

  function resetGame(){
    const resetSquares = Array(9).fill(null);
    onPlay(resetSquares);
  }
  
  function render_board(board_height, board_width){
    const rows = [];

    for(let i = 0; i < board_height; i++){
      const columns = [];
      
      for(let j = 0; j < board_width; j++){
         const key_index = (i * board_width) + j;
        columns.push(<Square value={key_index} key={key_index} onSquareClick={() => handleClick(key_index)} />);
        
        //console.log(key_index);
      }
    rows.push(<div className="board-row" key={i}>{columns}</div>);
    }
    //console.log(rows);
    return(rows);
  }

  return(
    <>
      <div className="status">n-pussel</div>
      {squares}
      <button onClick={() => resetGame()}>Reset!</button>
    </>
  );
  }


