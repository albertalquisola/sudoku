app.Models.Cell = Backbone.Model.extend({
  initialize: function(){
    this.attributes.row    = this.getRow();
    this.attributes.column = this.getColumn();
    this.attributes.box    = this.getBox();
  },

  getRow: function() {
    return Math.floor(this.attributes.position / 9)
  },
  getColumn: function() {
    return this.attributes.position % 9
  },
  getBox: function() {
    return (Math.floor(this.getColumn() / 3)) +
           (Math.floor((this.getRow() / 3)) * 3)
  },
  incrementByOne: function() {
    var currentValue = this.attributes.currentValue
    this.set({currentValue : currentValue + 1})
  },

  resetToZero: function() {
    this.set({currentValue: 0})
  }
})