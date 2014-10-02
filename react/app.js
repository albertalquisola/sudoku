/** @jsx React.DOM */
//flow
//there is an inputBox where users can enter a sudoku string
//in the inputBox react component, the render portion should have an onSubmit event handler
//onSubmit, the inputBox should have a function/callback to handle the submit

app.Views.App = React.createClass({displayName: 'App',
  mixins: [Backbone.React.Component.mixin],

  startGame: function(game) {
    var board = this.getCollection()
    this.populateBoard(game,board)
  },

  populateBoard: function(game,board) {
    return Sudoku.buildBoard(game,board)
  },

  render: function() {
    console.log(this.props.collection)
    return (
      React.DOM.div(null, 
        React.DOM.h1(null, "003020600900305001001806400008102900700000008006708200002609500800203009005010300"), 
        app.Views.SudokuBoard({collection: this.props.collection}), 
        app.Views.InputBox({startGame: this.startGame})
      )
    )
  }
})

React.renderComponent(app.Views.App({collection: new app.Collections.Board(), data: "this is data"}), document.getElementById('sudoku'))