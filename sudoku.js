var Sudoku = Sudoku || {}

Sudoku.games = {
  easy: '003020600900305001001806400008102900700000008006708200002609500800203009005010300',
  medium: '290500007700000400004738012902003064800050070500067200309004005000080700087005109',
  hard: '000689100800000029150000008403000050200005000090240801084700910500000060060410000',
  extreme: '096040001100060004504810390007950043030080000405023018010630059059070830003590007'
}

function Cell(value, index) {
  this.position = index
  this.row = this.rowFor(this.position)
  this.column = this.columnFor(this.position)
  this.box = this.boxFor(this.position)
  this.options = this.fillOptions()
  this.originalValue = parseInt(value)
  this.currentValue = parseInt(value)
}

Cell.prototype = {
  rowFor: function(idx) {
    return  Math.floor(idx / 9)
  },
  columnFor: function(idx) {
    return idx % 9
  },
  boxFor: function(idx) {
    return (Math.floor(this.columnFor(idx)/3)) + (Math.floor((this.rowFor(idx) / 3)) * 3)
  },
  fillOptions: function() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }
}

Sudoku.BoardBuilder = function (boardValues){

  function makeIntoArray(boardValuesString){
    return boardValues.split('')
  }

  function cellify(value,idx){
    return new Cell(value, idx)
  }

  function populateBoard(boardValues){
    var cells = []
    makeIntoArray(boardValues)
    .forEach(function(num,idx){
      var cell = cellify(num,idx)
      cells.push(cell)
    })
    return cells
  }

  return populateBoard(boardValues)
}

Sudoku.Solver = function(board) {
  function isValueIn(category, cell) {
    var result = false
    Sudoku.board.forEach(function(otherCell){
      if (otherCell[category] === cell[category]) {
        if (otherCell.currentValue === cell.currentValue 
            && otherCell.position !== cell.position) {
          result = true
        }
      }
    })
    return result
  }

  function possibleValue(cell) {
    var result =
      (!isValueIn("row", cell)) &&
      (!isValueIn("column", cell)) &&
      (!isValueIn("box", cell))
      ? true : false
    if (cell.currentValue > 9) { result = false }
    return result
  }

  function retreat(board, cell) {
    var currentCell = board[cell.position-1]
    if (currentCell.originalValue === 0) {
      currentCell.currentValue++
      while(!possibleValue(currentCell)) {
        if (currentCell.currentValue > 9) {
          currentCell.currentValue = 0
          return retreat(board, currentCell)
        }
        currentCell.currentValue++
        Sudoku.displayBoard(board)
      }
      return currentCell.position
    } else {
     return retreat(board, currentCell)
    }
  }

  //all knowing function
  function solveBoard(board, index) {
    var index = index || 0
    for (var i = 0; i < board.length; i++) {
      var cell = board[i]
      if (parseInt(cell.originalValue) === 0) {
        cell.currentValue++
        while(!possibleValue(cell)) {
          if (cell.currentValue > 9) {
            cell.currentValue = 0
            i = retreat(board, cell)
            break
          } else {
            cell.currentValue++
            Sudoku.displayBoard(board)
          }
        }
      }
    }
    return board
  }

  return solveBoard(board)
}

// Sudoku.board = Sudoku.BoardBuilder.buildBoard
// var solution = Sudoku.Solver(Sudoku.board)

Sudoku.displayBoard = function(board) {
  var numbers = []

  board.forEach(function(cell) {
    numbers.push(cell.currentValue)
  })

  for(var index = 0; index < 80; index+=9) {
    var num = index + 9
    console.log(numbers.slice(index,num))
  }
  console.log('\n')
}

// displayBoard(solution)
