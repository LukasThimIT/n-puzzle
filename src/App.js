import { useState } from "react";

/*
Sidan skall vara responsive och funka i mobil, surfplatta osv.
---Brickorna skall vara numrerade från 1 och uppåt
---Det skall vara exakt ett tomrum
---Brickor flyttas genom att klicka på en bricka i samma kolumn eller rad som den tomma rutan, då flyttas den brickan och alla brickor mellan den och tomrummet ett steg mot den tomma rutan. Så om användaren klickar på femman i exempelwireframen nedan så flyttas både femman och tian ett steg nedåt.
All text skall vara i Google-fonten Open Sans
---Brickornas initiala ordning skall vara slumpad
---Det skall finnas en knapp för att slumpa om ordningen
---Om användaren löser pusslet skall det skrivas ut på skärmen på något lämpligt sätt.
*/

function Square({value, onSquareClick, style}){
  return (<button className={style} onClick={onSquareClick}>
              {value}
          </button>);
}

export default function Board({onPlay}){
  var boardWidth = 3;
  var boardHeight = 3;
  var boardValues = Array.from({length : boardHeight*boardWidth}, (_, v) => v);
  shuffle();
  const[status, setStatus] = useState(null);
  const [squares, setSquares] = useState(render_board(boardHeight, boardWidth, boardValues));
  
  function handleClick(i){
    if (boardValues[i] == 0){
      return
    }
    boardValues = moveSquares(boardValues, i)
    setSquares(render_board(boardHeight, boardWidth, boardValues));
    setStatus(checkIfWon(boardValues));
  }

  function shuffle(){
    return boardValues.sort(() => Math.random() - 0.5); 
  }

  function moveSquares(boardValues, squareIndex){
    const emptyIndex = boardValues.findIndex((i => i == 0));
    const emptyCol = emptyIndex % boardWidth;
    const emptyRow = Math.floor(emptyIndex / boardWidth);
    const squareCol = squareIndex % boardWidth;
    const squareRow = Math.floor(squareIndex / boardWidth);
    

    if(squareRow == emptyRow){
      if(emptyIndex > squareIndex){
        for(let i = emptyIndex; i > squareIndex; i--){
          boardValues[i] = boardValues[i - 1];
        }
        boardValues[squareIndex] = 0;
      }
      else{
        for(let i = emptyIndex; i < squareIndex; i++){
          boardValues[i] = boardValues[i + 1];
        }
        boardValues[squareIndex] = 0;
      }
    }
    else if(squareCol == emptyCol){
      if(emptyIndex > squareIndex){
        for(let i = emptyIndex; i > squareIndex; i -= boardWidth){
          boardValues[i] = boardValues[i - boardWidth];
        }
        boardValues[squareIndex] = 0;
      }
      else{
        for(let i = emptyIndex; i < squareIndex; i += boardWidth){
          boardValues[i] = boardValues[i + boardWidth];
        }
        boardValues[squareIndex] = 0;
      }
    }

    return boardValues;
  }

  function resetGame(){
    shuffle();
    setSquares(render_board(boardHeight, boardWidth, boardValues));
  }
  
  function checkIfWon(){
    var winningBoard = Array.from({length : boardHeight*boardWidth - 1}, (_, v) => v + 1);
    winningBoard[boardHeight*boardWidth - 1] = 0;
    
    if(JSON.stringify(boardValues) === JSON.stringify(winningBoard)){
      return "YOU WON!";
    }
    else{
      return null; 
    }
  }

  function render_board(boardHeight, boardWidth, squareValues){
    const rows = [];

    for(let i = 0; i < boardHeight; i++){
      const columns = [];
      
      for(let j = 0; j < boardWidth; j++){
        const index = (i * boardWidth) + j;
        if(squareValues[index] == 0){
          columns.push(<Square style="square emptySquare" value={squareValues[index]} key={index} onSquareClick={() => handleClick(index)} />);
        }
        else{
          columns.push(<Square style="square" value={squareValues[index]} key={index} onSquareClick={() => handleClick(index)} />);
        }
      }
    rows.push(<div className="board-row" key={i}>{columns}</div>);
    }
    return(rows);
  }

  return(
    <>
      <div className="status">n-pussel {status}</div>

      
      {squares}
      <button onClick={() => resetGame()}>Reset!</button>
    </>
  );
  }
