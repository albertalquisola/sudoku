/** @jsx React.DOM */
app.Views.SudokuBoard = React.createClass({displayName: 'SudokuBoard',
  // getInitialState: function() {
  //   return (null)
  // },

  componentDidMount: function() {
    app.Board.on('change', this.setState)
  },

  render: function() {
    // var numbers = this.state.forEach(function(number){
    //   return <SudokuCell number={number} />
    // })
    return (
      React.DOM.div(null, 
        "hello"
      )
    )
  }
})

React.renderComponent(app.Views.SudokuBoard(null), document.getElementById('sudoku'))