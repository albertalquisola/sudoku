Sudoku.solve = function(board, display) {

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

    Sudoku.board.forEach(function(otherCell){
      if (
        categoryMatches(category,cell,otherCell) &&
        valueMatches(cell, otherCell) &&
        notSameCell(cell, otherCell) ) {
          result = true
        }
    })
    return result
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

