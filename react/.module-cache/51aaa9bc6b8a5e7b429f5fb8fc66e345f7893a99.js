/** @jsx React.DOM */

    // var SudokuBoard = React.createClass({
    //   initiateGame: function(boardString) {
    //     test.set({name:boardString})
    //     //populate models
    //   },

    //   getInitialState: function(){
    //     return {data: 'whatevs'}
    //   },

    //   componentDidMount: function(){
    //     test.on('change:name',function(){
    //       this.setState({data: test.get("name")})
    //     }.bind(this))
    //   },

    //   render: function(){
    //     return (
    //       <div>
    //         <h1>Sudoku</h1>
    //         <SudokuCell number={this.state.data} />
    //         <sudokuForm onGameSubmit={this.initiateGame} />
    //       </div>
    //     )
    //   }
    // })
    var app = app || {}

    var SudokuBoard = React.createClass({displayName: 'SudokuBoard',
      getInitialState: function() {

      },

      componentDidMount: function() {

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

    var SudokuCell = React.createClass({displayName: 'SudokuCell',
      render: function() {
        return (
          React.DOM.span(null, this.props.number)
        )
      }
    })

    var SudokuForm = React.createClass({displayName: 'SudokuForm',
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
      SudokuBoard(null), document.getElementById('sudoku')
    )