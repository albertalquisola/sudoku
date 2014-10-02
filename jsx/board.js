/** @jsx React.DOM */
app.Views.SudokuBoard = React.createClass({

  componentDidMount: function() {

  },

  render: function() {
    var numbers = []

    if (this.props.collection) {
      numbers = this.props.collection.map(function(cell) {
        return <app.Views.Cell number={cell.currentValue} />
      })
    }

    return (
      <div>{numbers}</div>
    )
  }
})

