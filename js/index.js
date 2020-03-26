const board = document.querySelectorAll('.square')
const reset = document.querySelector('header input')
const message = document.querySelector('footer span')
let turn = 0
let moves = [["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""]]
let gameOver = false

for (let i = 0; i < board.length; i ++){
    const square = board[i]

    square.addEventListener('click', ()=>{
       if (makeSelection(square)){

        updateMoves(i, square.innerHTML, parseInt(square.dataset['square']))

        document.querySelector('#winner').innerHTML = checkWin(moves)
       }
    })
}
const updateMoves = (place,player,points)=> {
    moves[place] = [player,points]
}

const checkWin = (arr)=> {
    let xMoves = arr.filter(a => a[0]=="X")
    let oMoves = arr.filter(a => a[0]=="O")
    
    if (row(xMoves)) {
        gameOver = !gameOver
        return "X"
    }
    if (row(oMoves)) {
        gameOver = !gameOver
        return "O"
    }
    return "Pending"
}
const row = (arr)=>{
    for (let i = 0; i < arr.length; i++) {        
        for (let j = i + 1 ; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i][1] + arr[j][1] + arr[k][1] === 15) {
                    document.querySelector(`#turn`).innerHTML = "Game Over"
                    return true;
                  }else {
                      
                      return false
                  }
            }
        }
    }
}
const emptyboard = () => {
    moves = [["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""]]
    gameOver = false
    document.querySelector(`#turn`).innerHTML = "X"
    document.querySelector(`#winner`).innerHTML = ""
    turn = 0 // make first user be X all the time
    for (let i = 0; i < board.length; i ++){
        const square = board[i]
        square.innerHTML = ''
    }
}

const makeSelection = (sel) => {    
    if (gameOver){
        return false
    } 
    if (sel.innerHTML !== '') return false
    if (turn === 0){
        sel.innerHTML = 'X'
        turn ++
        document.querySelector(`#turn`).innerHTML = "O"
        return true
    }else {
        sel.innerHTML = 'O'
        turn --
        document.querySelector(`#turn`).innerHTML = "X"
        return true
    }
    
}

reset.addEventListener('click', emptyboard)