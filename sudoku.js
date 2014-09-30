var easyGame    =  '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
var mediumGame  = '400000805030000000000700000020000060000080400000010000000603070500200000104000000'
var hardGame    = '850002400720000009004000000000107002305000900040000000000080070017000000000036040'
var extremeGame = '800000000003600000070090200050007000000045700000100030001000068008500010090000400'
var Sudoku = {}


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

Sudoku.BoardBuilder = (function (boardValues){

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

  return { buildBoard: populateBoard(boardValues) }
})(easyGame)


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
          }
        }
      }
    }
    return board
  }

  return solveBoard(board)
}

Sudoku.board = Sudoku.BoardBuilder.buildBoard
var solution = Sudoku.Solver(Sudoku.board)

function displayBoard(board) {
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

displayBoard(solution)
