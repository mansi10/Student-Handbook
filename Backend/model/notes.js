const mongoose = require('mongoose')

const noteSchema =  mongoose.Schema({
  title: {type: String, default: "Note"},
  tags: {type: [String], default: []},
  content: {type: String, default: ""},
  createdByID: {type: String, default: ""}
})

module.exports =mongoose.model('Notes',noteSchema)