/** @jsx React.DOM */
app.Views.SudokuBoard = React.createClass({displayName: 'SudokuBoard',

  render: function() {
    var numbers = []

    if (this.props.board) {
      numbers = this.props.board.map(function(cell) {
        return app.Views.Cell({number: cell.currentValue})
      })
    }

    return (
      React.DOM.div(null, numbers)
    )
  }
})

