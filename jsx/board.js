/** @jsx React.DOM */
app.Views.SudokuBoard = React.createClass({
  render: function() {
    var numbers = []

    if (this.props.board) {
      numbers = this.props.board.map(function(cell) {
        return <app.Views.Cell number={cell.currentValue} />
      })
    }

    return (
      <div>{numbers}</div>
    )
  }
})

