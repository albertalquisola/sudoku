/** @jsx React.DOM */
app.Views.Cell = React.createClass({displayName: 'Cell',
  render: function() {
    return (
      React.DOM.span(null, this.props.number)
    )
  }
})