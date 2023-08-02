const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display")
const width = 8;
let playerGo = 'black';
playerDisplay.textContent = 'Black';

const startPieces = [
                    rook, knight, bishop, queen, king, bishop, knight, rook,
                    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
                    '', '','', '','', '','', '',
                    '', '','', '','', '','', '',
                    '', '','', '','', '','', '',
                    '', '','', '','', '','', '',
                    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
                    rook, knight, bishop, queen, king, bishop, knight, rook
                ];

//Create board
createBoard = () => {
    startPieces.forEach((startPiece, i) => {
      const square = document.createElement('div');
      square.classList.add("square");
      square.innerHTML = startPiece;
      square.firstChild && square.firstChild.setAttribute('draggable', true);
      square.setAttribute('square-id', i);
      
      //Create the tile colours
      const row = Math.floor((63 - i) / 8) + 1;
      if(row % 2 === 0) {
          square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
      } else {
          square.classList.add(i % 2 === 0 ? 'brown' : 'beige');
      }
  
      if( i <= 15) {
          square.firstChild.firstChild.classList.add('black');
      }
      if( i >= 48) {
          square.firstChild.firstChild.classList.add('white');
      }
      //Place to board
      gameBoard.append(square);
    })
  }
  
  createBoard();


//Creating drag functionality
let startPositionId;
let draggedElement;

dragStart = (e) => {
    startPositionId = e.target.parentNode.getAttribute("square-id");
    draggedElement = e.target;
  };

dragOver = (e) => {
    e.preventDefault() ;
  };

dragDrop = (e) => {
    e.stopPropagation();
    const taken = e.target.classList.contains('piece');
    const valid = checkifValid(e.target);
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const opponentGo = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

    if(correctGo) {
        if(takenByOpponent && valid) {
            //Must check this first
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            checkForWin();
            changePlayer();
            return
        }

        if(taken && !takenByOpponent) {
            infoDisplay.textContent = "Invalid Move :("
            setTimeout(() => infoDisplay.textContent = "", 2000);
            return
        }

        if(valid) {
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
        }
    }
  };

  checkifValid = (target) => {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;
    console.log('targetId', targetId);
    console.log('startId', startId);
    console.log('piece', piece);

    switch(piece) {
        case 'pawn' : 
            const starterRow = [8, 9, 10, 11, 12, 13, 14];
            if (
                starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId ||
                startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild
            ) {
                return true;
            }
            break;
        case 'knight' :
            if(
                startId + width * 2 + 1 === targetId ||
                startId + width * 2 - 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId
            ) {
                return true;
            }
            break;
        case 'bishop' : 
            if(
                //FORWARDS
                startId + width + 1 === targetId ||
                //Check previous tile is unblocked
                startId + width * 2 + 2 === targetId && 
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                //Check previous 2 tiles are unblocked
                startId + width * 3 + 3 === targetId && 
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                //Check previous 3 tiles are unblocked
                startId + width * 4 + 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                //Check previous 4 tiles are unblocked
                startId + width * 5 + 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                //Check previous 5 tiles are unblocked
                startId + width * 6 + 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                //Check previous 6 tiles are unblocked
                startId + width * 7 + 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild ||
                
                startId + width - 1 === targetId ||
                //Check previous tile is unblocked
                startId - width * 2 - 2 === targetId && 
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                //Check previous 2 tiles are unblocked
                startId + width * 3 - 3 === targetId && 
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
                //Check previous 3 tiles are unblocked
                startId + width * 4 - 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
                //Check previous 4 tiles are unblocked
                startId + width * 5 - 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
                //Check previous 5 tiles are unblocked
                startId + width * 6 - 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
                //Check previous 6 tiles are unblocked
                startId + width * 7 - 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild ||
                //BACKWARDS
                startId - width - 1 === targetId ||
                //Check previous tile is unblocked
                startId - width * 2 - 2 === targetId && 
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                //Check previous 2 tiles are unblocked
                startId - width * 3 - 3 === targetId && 
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
                //Check previous 3 tiles are unblocked
                startId - width * 4 - 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
                //Check previous 4 tiles are unblocked
                startId - width * 5 - 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
                //Check previous 5 tiles are unblocked
                startId - width * 6 - 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
                //Check previous 6 tiles are unblocked
                startId - width * 7 - 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild ||
                startId - width + 1 === targetId ||
                //Check previous tile is unblocked
                startId - width * 2 + 2 === targetId && 
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                //Check previous 2 tiles are unblocked
                startId - width * 3 + 3 === targetId && 
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
                //Check previous 3 tiles are unblocked
                startId - width * 4 + 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
                //Check previous 4 tiles are unblocked
                startId - width * 5 + 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
                //Check previous 5 tiles are unblocked
                startId - width * 6 + 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
                //Check previous 6 tiles are unblocked
                startId - width * 7 + 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild
            ) {
                return true;
            }
            break;
        case 'rook' :
            if(
                //FORWARDS
                startId + width === targetId ||
                startId + width * 2 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                //BACKWARDS
                startId - width === targetId ||
                startId - width * 2 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                //RIGHT
                startId + 1 === targetId ||
                startId + 2 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                //LEFT
                startId - 1 === targetId ||
                startId - 2 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ) {
                return true;
            }
            break;
        case 'queen' :
            if(
                //FORWARDS
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && 
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && 
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild ||
                
                startId + width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && 
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && 
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild ||
                //BACKWARDS
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && 
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && 
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild ||
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && 
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && 
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild ||
                //FORWARDS
                startId + width === targetId ||
                startId + width * 2 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                //BACKWARDS
                startId - width === targetId ||
                startId - width * 2 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - width}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                //RIGHT
                startId + 1 === targetId ||
                startId + 2 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId &&
                    !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                //LEFT
                startId - 1 === targetId ||
                startId - 2 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId &&
                    !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 5}"]`).firstChild &&
                    !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ) {
                return true;
            }
            break;
        case 'king' :
            if(
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width + 1 === targetId ||
                startId + width - 1 === targetId ||
                startId - width + 1 === targetId ||
                startId - width - 1 === targetId
            ) {
                return true;
            }
            break;
            default:
                break;
    }
  };


//Change Player
changePlayer = () => {
    if (playerGo === 'black') {
        ReverseIds();
        playerGo = "white";
        playerDisplay.textContent = "White";
    } else {
        RevertIds();
        playerGo = 'black';
        playerDisplay.textContent = 'Black';
    }
}

//Reverse board tile IDs
ReverseIds = () => {
  const allSquares = document.querySelectorAll(".square")
  allSquares.forEach((square, i) => {
    square.setAttribute('square-id', (width *  width - 1) - i);
  })
}

//Revert board tile IDs
RevertIds = () => {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => {
      square.setAttribute('square-id', i);
    })
  }

const allSquares = document.querySelectorAll("#gameboard .square");

//Add Event Listeners
allSquares.forEach((square, i) => {
  square.addEventListener('dragstart', dragStart);
  square.addEventListener('dragover', dragOver);
  square.addEventListener('drop', dragDrop);
});

//Check for win
checkForWin = () => {
  const kings = Array.from(document.querySelectorAll('#king'))
  if(!kings.some(king => king.firstChild.classList.contains('white'))) {
    infoDisplay.textContent = 'Black Wins!!';
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => square.firstChild?.setAttribute(draggable, false));
  } else if(!kings.some(king => king.firstChild.classList.contains('black'))) {
    infoDisplay.textContent = 'White Wins!!';
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => square.firstChild?.setAttribute(draggable, false));
  }
}