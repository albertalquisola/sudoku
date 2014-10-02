Sudoku.buildBoard = function (boardValues,board){

  function makeIntoArray(){
    return boardValues.split('')
  }

  function cellify(value,idx){
    var val = parseInt(value)
    var idx = parseInt(idx)
    return new app.Models.Cell({
      originalValue: val,
      currentValue: val,
      position: idx
    })
  }

  function populateBoard(boardValues, board){
    makeIntoArray(boardValues).forEach(function(num,idx){
      var cell = cellify(num,idx)
      board.add([cell])
    })
    return board
  }

  return populateBoard(boardValues,board)
}
