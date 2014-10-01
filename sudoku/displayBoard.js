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