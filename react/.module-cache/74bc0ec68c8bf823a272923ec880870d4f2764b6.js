/** @jsx React.DOM */
//flow
//there is an inputBox where users can enter a sudoku string
//in the inputBox react component, the render portion should have an onSubmit event handler
//onSubmit, the inputBox should have a function/callback to handle the submit

var app = {
  Models: {},
  Views: {},
  Collections: {}
}

app.Views.App = React.createClass({displayName: 'App',
  mixins: [Backbone.React.Component.mixin],

  startGame: function() {
    console.log("starting game")
  },

  render: function() {
    return (
      app.Views.InputBox({startGame: this.startGame})
    )
  }
})