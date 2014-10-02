/** @jsx React.DOM */
var app.Views.SudokuBoard = React.createClass({
  getInitialState: function() {

  },

  componentDidMount: function() {
    app.Board.on('change', this.setState)
  },

  render: function() {
    var numbers = this.state.forEach(function(number){
      return <SudokuCell number={number} />
    })
    return (
      <div>
        {numbers}
      </div>
    )
  }
})