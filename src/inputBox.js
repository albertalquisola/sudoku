/** @jsx React.DOM */

var app.Views.InputBox = React.createClass({
      handleSubmit: function(event) {
        event.preventDefault()
        var sudokuGame = this.refs.sudokuGame.getDOMNode().value.trim()
        if (!sudokuGame) return
        this.props.onGameSubmit(sudokuGame)
        this.refs.sudokuGame.getDOMNode().value = ''
      },

      render: function() {
        return (
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="enter sudoku game" ref="sudokuGame" />
            <input type="submit" />
          </form>
        )
      }
    })