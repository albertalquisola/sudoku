//Backbone model and collection classes
var Cell = Backbone.Model.extend({
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
  }
})