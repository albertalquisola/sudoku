var Sudoku = Sudoku || {};

(function($) {
  $(function() {
    Sudoku.init()
  })
})(jQuery)

Sudoku.init = function() {
  setElements()
  bindEventListeners()
}

function setElements() {
  var easyButton = document.getElementById('easy')
  var mediumButton = document.getElementById('medium')
  var hardButton = document.getElementById('hard')
  var extremeButton = document.getElementById('extreme')
  var solveButton = document.getElementById('solve')

  Sudoku.Controls = {
    easy: easyButton,
    medium: mediumButton,
    hard: hardButton,
    extreme: extremeButton,
    solve: solveButton
  }
}

function bindEventListeners() {

  Sudoku.Controls.easy.addEventListener('click', function(event) {
    var type = event.target.id
    displayCurrentGame(Sudoku, type)
    setBoardType(Sudoku, type)
  })

  Sudoku.Controls.medium.addEventListener('click', function(event) {
    var type = event.target.id
    displayCurrentGame(Sudoku, type)
    setBoardType(Sudoku, type)
  })

  Sudoku.Controls.hard.addEventListener('click', function(event) {
    var type = event.target.id
    displayCurrentGame(Sudoku, type)
    setBoardType(Sudoku, type)
  })

  Sudoku.Controls.extreme.addEventListener('click', function(event) {
    var type = event.target.id
    displayCurrentGame(Sudoku, type)
    setBoardType(Sudoku, type)
  })

  Sudoku.Controls.solve.addEventListener('click', function(event) {
    Sudoku.Solver(Sudoku.board)
  })
}

function displayCurrentGame(sudoku, type) {
  console.log(type + ': ' + sudoku.games[type])
  $('#current-game').text(sudoku.games[type])
}

function setBoardType(sudoku, type) {
  sudoku.board = sudoku.BoardBuilder(sudoku.games[type])
}