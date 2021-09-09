/**
* Author: Gurleen Saluja (gr997570@dal.ca)
*/
const mongoose = require('mongoose');

/* Model fields for Modify member access component. */
const modificationRequestSchema = mongoose.Schema({
  email: {type: String, unique: true},
  name: {type: String},
  role: {type: String},
  faculty: {type: String},
  program: {type: String},
  startDate: {type: String},
  endDate: {type: String},
  location: {type: String},
  preference: {type: String},
  campusLocation: {type: String},
  requestType: {type: String},
  requestDate: {type: String},
  requestStatus: {type: String},
  modificationDate: {type: String},
  isRegistered: {type: Boolean}
});

module.exports = mongoose.model('ModifiedUser', modificationRequestSchema);
