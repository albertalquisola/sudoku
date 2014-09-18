//Sudoku Cell Constructor Function
function Cell(object) {
  this.row = object.row,
  this.column = object.column,
  this.box = object.box,
  this.options = object.options,
  this.originalValue = object.originalValue,
  this.value = object.value
}

