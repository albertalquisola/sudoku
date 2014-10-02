/** @jsx React.DOM */
//flow
//there is an inputBox where users can enter a sudoku string
//in the inputBox react component, the render portion should have an onSubmit event handler
//onSubmit, the inputBox should have a function/callback to handle the submit

app.Views.App = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  startGame: function(game) {
    var board = this.getCollection()
    this.populateBoard(game,board.models)
    console.log(board)
  },

  populateBoard: function(game,board) {
    return Sudoku.buildBoard(game,board)
  },

  render: function() {
    return (
      <div>
        <app.Views.SudokuBoard />
        <app.Views.InputBox startGame={this.startGame} />
      </div>
    )
  }
})

React.renderComponent(<app.Views.App collection={new app.Collections.Board}/>, document.getElementById('sudoku'))