Sudoku.buildBoard = function (boardValues){

  function makeIntoArray(){
    return boardValues.split('')
  }

  function cellify(value,idx){
    var val = parseInt(value)
    var idx = parseInt(idx)
    return new Cell({
      originalValue: val,
      currentValue: val,
      position: idx
    })
  }

  function populateBoard(boardValues){
    var board = new Board()
    makeIntoArray(boardValues)
    .forEach(function(num,idx){
      var cell = cellify(num,idx)
      board.push(cell)
    })
    return board
  }

  function assignBoard(board,callback) {
    Sudoku.board = board
  }

  return populateBoard(boardValues)
}
