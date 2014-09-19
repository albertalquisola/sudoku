var easyGame = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
var mediumGame = '400000805030000000000700000020000060000080400000010000000603070500200000104000000'
var hardGame = '850002400720000009004000000000107002305000900040000000000080070017000000000036040'

var Sudoku = {}

function Cell(value, index) {
  this.position = index
  this.row = this.rowFor(this.position)
  this.column = this.columnFor(this.position)
  this.box = this.boxFor(this.position)
  this.options = this.fillOptions()
  this.originalValue = value
  this.currentValue = value
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
})


Sudoku.Solver = function(board) {
  (function changeZeroesToOnes() {
    board.forEach(function(cell) {
      if (cell.originalValue === 0) {
        cell.currentValue++
      }
    })
  })()

  function retreat(board) {
    while(!valid) {
          cell.currentValue++
          valid = possibleValue(cell)
          if (cell.currentValue > 9) {

          }
        }
  }

  //all knowing function
  function solveBoard(board) {
    board.forEach(function(cell, index) {
      if (cell.originalValue === 0) {
        retreat(board, index);
      }
    })
  }

  return { solve: solveBoard(board) }

  }
}

Sudoku.board = Sudoku.BoardBuilder.buildBoard(easyGame)




































