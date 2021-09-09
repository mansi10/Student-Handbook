const mongoose = require('mongoose')

const groupFormationSchema =  mongoose.Schema({
  groupName: {type: String},
  location: {type: String},
  faculty: {type: String},
  mentor:  {type: String, default:"un-assigned"},
})

module.exports =mongoose.model('mentorshipGroup',groupFormationSchema)