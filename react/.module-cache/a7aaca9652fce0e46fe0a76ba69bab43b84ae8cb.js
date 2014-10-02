/** @jsx React.DOM */
//flow
//there is an inputBox where users can enter a sudoku string
//in the inputBox react component, the render portion should have an onSubmit event handler
//onSubmit, the inputBox should have a function/callback to handle the submit

app.Views.App = React.createClass({displayName: 'App',
  mixins: [Backbone.React.Component.mixin],

  startGame: function() {
    var board = this.getCollection()
    console.log(board)
  },

  render: function() {
    return (
      React.DOM.div(null, 
        app.Views.SudokuBoard(null), 
        app.Views.InputBox({startGame: this.startGame})
      )
    )
  }
})

React.renderComponent(app.Views.App({board: new app.Collections.SudokuBoard}), document.getElementById('sudoku'))