var easyGame    =  '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
var mediumGame  = '400000805030000000000700000020000060000080400000010000000603070500200000104000000'
var hardGame    = '850002400720000009004000000000107002305000900040000000000080070017000000000036040'
var extremeGame = '800000000003600000070090200050007000000045700000100030001000068008500010090000400'

//Sudoku namespaced main object
var Sudoku = {}

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

  return populateBoard(boardValues)
}

Sudoku.Solver = function(board) {

  function categoryMatches(category, cell, comparingCell) {
    return comparingCell.attributes[category] === cell.attributes[category]
  }

  function valueMatches(cell, comparingCell) {
    return comparingCell.attributes.currentValue === cell.attributes.currentValue
  }

  function notSameCell(cell, comparingCell) {
    return comparingCell.attributes.position !== cell.attributes.position
  }

  function possibleValue(cell) {
    var result =
      ifValueIsIn("row", cell) ||
      ifValueIsIn("column", cell) ||
      ifValueIsIn("box", cell)
      ? false : true
    if (cell.attributes.currentValue > 9) result = false
    return result
  }

  function ifValueIsIn(category, cell) {
    var result = false

    Sudoku.board.forEach(function(otherCell){
      if (categoryMatches(category,cell,otherCell)) {
        if (valueMatches(cell, otherCell) &&
            notSameCell(cell, otherCell)) {
              result = true
        }
      }
    })
    return result
  }

  function retreat(board, cell) {
    var currentCell = board.models[cell.attributes.position-1]
    if (currentCell.attributes.originalValue === 0) {
      currentCell.attributes.currentValue++
      while(!possibleValue(currentCell)) {
        if (currentCell.attributes.currentValue > 9) {
          currentCell.attributes.currentValue = 0
          return retreat(board, currentCell)
        }
        currentCell.attributes.currentValue++
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

Sudoku.displayBoard = function(board) {
  var numbers = []

  board.forEach(function(cell) {
    numbers.push(cell.attributes.currentValue)
  })

  for(var index = 0; index < 81; index+=9) {
    var num = index + 9
    console.log(numbers.slice(index,num))
  }
  console.log('\n')
}

Sudoku.board = Sudoku.buildBoard(extremeGame)
var solution = Sudoku.Solver(Sudoku.board)

Sudoku.displayBoard(solution)