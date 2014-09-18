var Sudoku = {}

Sudoku.board = (function makeBoard (boardValues){

  function makeIntoArray(boardValuesString){
    return boardValues.split('')
  }

  function rowFor(idx) {
    return  (idx / 9)
  }

  function columnFor(idx) {
    return (idx % 9)
  }

  function boxFor(idx) {
    return (columnFor(idx)/3) + ((rowFor(idx) / 3) * 3)
  }

  function Cell(cellData) {
    this.row = cellData.row,
    this.column = cellData.column,
    this.box = cellData.box,
    this.options = cellData.options,
    this.originalValue = cellData.originalValue,
    this.currentValue = cellData.currentValue
  }

  function cellify(num,idx){
    var cell = {}
    cell.row = rowFor(idx)
    cell.column = columnFor(idx)
    cell.box = boxFor(idx)

    return new Cell(cell)

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
}()

var easyGame = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
var mediumGame = '400000805030000000000700000020000060000080400000010000000603070500200000104000000'
var hardGame = '850002400720000009004000000000107002305000900040000000000080070017000000000036040'