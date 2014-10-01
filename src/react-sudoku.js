/** @jsx React.DOM */

    var sudoku = React.createClass({
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
          <div>
            <h1>Sudoku</h1>
            <sudokuBar data={this.state.data} />
            <sudokuForm onGameSubmit={this.initiateGame} />
          </div>
        )
      }
    })

    var sudokuBar = React.createClass({
      render: function() {
        return (
          <p>{this.props.data}</p>
        )
      }
    })

    var sudokuForm = React.createClass({
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

    React.renderComponent(
      <sudoku />, document.getElementById('sudoku')
    )