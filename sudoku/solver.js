Sudoku.solve = function(board) {

  function categoryMatches(category, cell, comparingCell) {
    return comparingCell.attributes[category] === cell.attributes[category]
  }

  function valueMatches(cell, comparingCell) {
    return comparingCell.attributes.currentValue === cell.attributes.currentValue
  }

  function notSameCell(cell, comparingCell) {
    return comparingCell.attributes.position !== cell.attributes.position
  }


  function ifValueIsIn(category, cell) {
    var result = false

    board.models.forEach(function(otherCell){
      if (categoryMatches(category,cell,otherCell) &&
          valueMatches(cell, otherCell) &&
          notSameCell(cell, otherCell) ) {
            result = true
        }
    })
    return result
  }

  function possibleValue(cell) {
    var possibleValue =
      ifValueIsIn("row", cell) ||
      ifValueIsIn("column", cell) ||
      ifValueIsIn("box", cell)
      ? false : true
    if (cell.attributes.currentValue > 9) possibleValue = false
    return possibleValue
  }

  function retreat(board, cell) {
    var currentCell = board.models[cell.attributes.position-1]
    if (currentCell.attributes.originalValue === 0) {
      currentCell.incrementByOne()
      while(!possibleValue(currentCell)) {
        if (currentCell.attributes.currentValue > 9) {
          currentCell.attributes.currentValue = 0
          return retreat(board, currentCell)
        }
        currentCell.incrementByOne()
      }
      return currentCell.attributes.position
    } else {
     return retreat(board, currentCell)
    }
  }

  //all knowing function
  function solveBoard(boarder, index) {
    var index = index || 0
    for (var i = 0; i < board.length; i++) {
      var cell = board.models[i]
      if (cell.attributes.originalValue === 0) {
        cell.incrementByOne()
        while(!possibleValue(cell)) {
          if (cell.attributes.currentValue > 9) {
            cell.resetToZero()
            i = retreat(board, cell)
            break
          } else {
            cell.incrementByOne()
          }
        }
      }
    }
    return board
  }

  return solveBoard(board)
}

