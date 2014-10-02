/** @jsx React.DOM */
var app.Views.Cell = React.createClass({
  render: function() {
    return (
      <span>{this.props.number}</span>
    )
  }
})