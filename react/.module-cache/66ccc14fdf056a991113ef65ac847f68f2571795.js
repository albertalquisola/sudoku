/** @jsx React.DOM */

app.Views.InputBox = React.createClass({displayName: 'InputBox',
      handleSubmit: function(event) {
        event.preventDefault()
        var sudokuGame = this.refs.sudokuGame.getDOMNode().value.trim()
        if (!sudokuGame) return
        this.props.startGame(sudokuGame)
        this.refs.sudokuGame.getDOMNode().value = ''
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


