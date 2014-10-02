/** @jsx React.DOM */
app.Views.SudokuBoard = React.createClass({displayName: 'SudokuBoard',


  componentDidMount: function() {
    app.Board.on('change', this.setState)
  },

  render: function() {
    return (
      React.DOM.div(null,
        numbers
      )
    )
  }
})

React.renderComponent(app.Views.SudokuBoard(null), document.getElementById('sudoku'))