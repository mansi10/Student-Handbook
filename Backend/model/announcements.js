/* 
 * Author: Mansi Singh 
 * Email id: mn518448@dal.ca
*/

// imports
const mongoose = require('mongoose')

// model schema for announcements
// schema includes details such as title, category, description, createdByName, createdById, createdOn
const announcementSchema =  mongoose.Schema({
  title: {type: String, default: "Announcement", required: true},
  category: {type: String, default: "", required: true},
  description: {type: String, default: "", required: true},
  createdByName: {type: String, default: ""},
  createdById: {type: String, default: ""},
  createdOn: { type: Date, default: "" }
})

module.exports =mongoose.model('Announcements',announcementSchema)