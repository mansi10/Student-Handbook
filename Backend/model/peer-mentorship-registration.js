/**
* Author: Gurleen Saluja (gr997570@dal.ca)
*/
const mongoose = require('mongoose');

/* Model fields for peer mentorship registration component. */
const peerMentorshipRegistrationSchema = mongoose.Schema({
  email: {type: String, unique: true},
  name: {type: String},
  role: {type: String},
  faculty: {type: String},
  program: {type: String},
  startDate: {type: String},
  endDate: {type: String},
  location: {type: String},
  campusLocation: {type: String, default: 'Halifax'},
  preference: {type: String},
  campusLocation: {type: String},
  group : {type: [{
    groupId: {type: String, default: ''},
    groupName: {type: String, default: ''},
  }], default: null},
  requestType: {type: String},
  requestDate: {type: String},
  requestStatus: {type: String},
  modificationDate: {type: String},
  isRegistered: {type: Boolean}
});

module.exports = mongoose.model('PeerMentorshipRegistrationDetail', peerMentorshipRegistrationSchema);
