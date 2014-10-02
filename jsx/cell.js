/** @jsx React.DOM */
app.Views.Cell = React.createClass({
  render: function() {
    return (
      <span>{this.props.number}</span>
    )
  }
})