/** @jsx React.DOM */
app.Views.SudokuBoard = React.createClass({displayName: 'SudokuBoard',
  getInitialState: function() {

  },

  componentDidMount: function() {
    app.Board.on('change', this.setState)
  },

  render: function() {
    var numbers = this.state.forEach(function(number){
      return SudokuCell({number: number})
    })
    return (
      React.DOM.div(null, 
        numbers
      )
    )
  }
})

React.renderComponent(app.Views.SudokuBoard(null), document.getElementById('sudoku'))