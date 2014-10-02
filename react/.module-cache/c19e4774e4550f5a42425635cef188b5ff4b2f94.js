/** @jsx React.DOM */

    var sudoku = React.createClass({displayName: 'sudoku',
      initiateGame: function(boardString) {
        test.set({name:boardString})
        //populate models
      },

      getInitialState: function(){
        return {data: 'whatevs'}
      },

      componentDidMount: function(){
        test.on('change:name',function(){
          this.setState({data: test.get("name")})
        }.bind(this))
      },

      render: function(){
        return (
          React.DOM.div(null,
            React.DOM.h1(null, "Sudoku"),
            sudokuBar({data: this.state.data}),
            sudokuForm({onGameSubmit: this.initiateGame})
          )
        )
      }
    })

    var sudokuBar = React.createClass({displayName: 'sudokuBar',
      render: function() {
        return (
          React.DOM.p(null, this.props.data)
        )
      }
    })

    var sudokuForm = React.createClass({displayName: 'sudokuForm',
      handleSubmit: function(event) {
        event.preventDefault()
        var sudokuGame = this.refs.sudokuGame.getDOMNode().value.trim()
        if (!sudokuGame) return
        this.props.onGameSubmit(sudokuGame)
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

    React.renderComponent(
      sudoku(null), document.getElementById('sudoku')
    )