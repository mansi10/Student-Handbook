const mongoose = require('mongoose')

const mentorSchema =  mongoose.Schema({
  name: {type: String, default: "", required: true},
  email: {type: String, default: "", required: true},
  faculty: {type: String, default: "", required: true},
  program: {type: String, default: ""},
  campusLocation: { type: String, default: "" }
})

module.exports = mongoose.model('Mentor',mentorSchema,'mentor');