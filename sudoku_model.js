//figure out how to populate the cell models with data
//how to insert all cell models into the board Collection
//figure out how to fire off change events when the models change so the dom can redraw itself

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

var Board = Backbone.Collection.extend({
  model: Cell
})

//create cells

// var test  = new Cell({value:9, index:13})
var test = new Cell({value: 2, index: 10})
var cell1 = new Cell({value:7,index:8})
var cell2 = new Cell()
var cell3 = new Cell()

//create board
var board = new Board([test,cell1,cell2])
// console.log(board.length)
// console.log(board.push(cell3))
// console.log(board.length)
// console.log(board.models[0].set({name:"tony"}))
// console.log(board.models[0].get("name"))


// test.set({value:2, index:14})
// console.log(">>>>>", test.attributes.value)
// console.log("the index prop of test is: ", test.get("index"))

// board.on('change', function(){
//   console.log("shit changed biatch!")
// })

// cell1.set({value: "tony"})
var newValue = cell1.attributes.value + 1
cell1.set({value: newValue})
// console.log(cell1.attributes.value = cell1.attributes.value + 1)
// console.log(cell1)