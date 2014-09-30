var easyGame    = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
var mediumGame  = '400000805030000000000700000020000060000080400000010000000603070500200000104000000'
var hardGame    = '850002400720000009004000000000107002305000900040000000000080070017000000000036040'
var extremeGame = '800000000003600000070090200050007000000045700000100030001000068008500010090000400'
var Sudoku = {}

Sudoku.displayBoard = function(board) {
  var numbers = []

  board.forEach(function(cell) {
    numbers.push(cell.attributes.currentValue)
  })

  for(var index = 0; index < 80; index+=9) {
    var num = index + 9
    console.log(numbers.slice(index,num))
  }
  console.log('\n')
}

var Cell = Backbone.Model.extend({
  initialize: function(){
    this.attributes.row    = this.getRow();
    this.attributes.column = this.getColumn();
    this.attributes.box    = this.getBox();
  },

  getRow: function() {
    return Math.floor(this.attributes.position / 9)
  },
  getColumn: function() {
    return this.attributes.position % 9
  },
  getBox: function() {
    return (Math.floor(this.getColumn() / 3)) +
           (Math.floor((this.getRow() / 3)) * 3)
  }
})

var Board = Backbone.Collection.extend({
  model: Cell,            
})

Sudoku.BoardBuilder = function (boardValues){

  function makeIntoArray(boardValuesString){
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

  return { buildBoard: populateBoard(boardValues) }
}

Sudoku.Solver = function(board) {
  function isValueIn(category, cell) {
    var result = false
    Sudoku.board.forEach(function(otherCell){
      if (otherCell.attributes[category] === cell.attributes[category]) {
        if (otherCell.attributes.currentValue === cell.attributes.currentValue
            && otherCell.attributes.position !== cell.attributes.position) {
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
    if (cell.attributes.currentValue > 9) { result = false }
    return result
  }

  function retreat(board, cell) {
    var currentCell = board.models[cell.attributes.position-1]
    if (currentCell.attributes.originalValue === 0) {
      currentCell.set({currentValue: currentCell.get("currentValue") + 1})
      while(!possibleValue(currentCell)) {
        if (currentCell.attributes.currentValue > 9) {
          currentCell.set({currentValue: 0})
          return retreat(board, currentCell)
        }
        currentCell.set({currentValue: currentCell.get("currentValue") + 1})
      }
      return currentCell.attributes.position
    } else {
     return retreat(board, currentCell)
    }
  }

  //all knowing function
  function solveBoard(board, index) {
    var index = index || 0
    for (var i = 0; i < board.length; i++) {
      var cell = board.models[i]
      if (cell.attributes.originalValue === 0) {
        cell.attributes.currentValue++
        while(!possibleValue(cell)) {
          if (cell.attributes.currentValue > 9) {
            cell.attributes.currentValue = 0
            i = retreat(board, cell)
            break
          } else {
            cell.attributes.currentValue++
          }
        }
      }
    }
    return board
  }

  return solveBoard(board)
}



// Sudoku.displayBoard(solution)