/** @jsx React.DOM */

app.Views.InputBox = React.createClass({displayName: 'InputBox',
      handleSubmit: function(event) {
        event.preventDefault()
        var sudokuGame = this.refs.sudokuGame.getDOMNode().value.trim()
        console.log(sudokuGame)
        if (!sudokuGame) return
        // this.props.onGameSubmit(sudokuGame)
        // this.refs.sudokuGame.getDOMNode().value = ''
      },

      render: function() {
        return (
          React.DOM.form({onSubmit: this.handleSubmit}, 
            React.DOM.input({type: "text", placeholder: "enter sudoku game", ref: "sudokuGame"}), 
            React.DOM.input({type: "submit"})
          )
        )
      }
    })