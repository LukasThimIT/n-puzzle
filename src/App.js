import { useState } from "react";

function Square({value, onSquareClick}){
  return (<button className="square" onClick={onSquareClick}>
              {value}
          </button>);
}

export default function Board({onPlay}){
  var boardWidth = 4;
  var boardHeight = 4;
  var boardValues = Array.from({length : boardHeight*boardWidth}, (_, v) => v);
  shuffle();
  const [squares, setSquares] = useState(render_board(boardHeight, boardWidth, boardValues));
  
  function handleClick(i){
    console.log(i);
    if (boardValues[i] == 0){ //kolla att squares[i] inte är lika med den tomma rutan
      boardValues = Array.from({length : boardHeight*boardWidth}, (_, v) => v+5);
      setSquares(render_board(boardHeight, boardWidth, boardValues));
      return
    }
    boardValues = Array.from({length : boardHeight*boardWidth}, (_, v) => v+2);
    setSquares(render_board(boardHeight, boardWidth, boardValues));
  }

  function shuffle(){
    return boardValues.sort(() => Math.random() - 0.5); 
  }

  function moveSquares(nextSquares){
    
  }

  function resetGame(){
    shuffle();
    setSquares(render_board(boardHeight, boardWidth, boardValues));
  }
  
  function render_board(boardHeight, boardWidth, squareValues){
    const rows = [];

    for(let i = 0; i < boardHeight; i++){
      const columns = [];
      
      for(let j = 0; j < boardWidth; j++){
        const index = (i * boardWidth) + j;
        columns.push(<Square value={squareValues[index]} key={index} onSquareClick={() => handleClick(index)} />);
        
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


