/** @jsx React.DOM */
//flow
//there is an inputBox where users can enter a sudoku string
//in the inputBox react component, the render portion should have an onSubmit event handler
//onSubmit, the inputBox should have a function/callback to handle the submit

app.Views.App = React.createClass({displayName: 'App',
  mixins: [Backbone.React.Component.mixin],

  startGame: function(game) {
    this.getCollection().reset()
    var board = this.getCollection()
    this.populateBoard(game,board)
    this.solveGame(board)
  },

  populateBoard: function(game,board) {
    Sudoku.buildBoard(game,board)
  },

  solveGame: function(board) {
    Sudoku.solve(board)

  },

  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, "Sample Game"), 
        React.DOM.p(null, "003020600900305001001806400008102900700000008006708200002609500800203009005010300"), 
        app.Views.SudokuBoard({board: this.props.collection}), 
        app.Views.InputBox({startGame: this.startGame})
      )
    )
  }
})

React.renderComponent(app.Views.App({collection: new app.Collections.Board()}), document.getElementById('sudoku'))