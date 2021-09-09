/**
* Author: Gurleen Saluja (gr997570@dal.ca)
*/
const mongoose = require('mongoose');

/* Model fields for manage registration. */
const manageRegistrationSchema = mongoose.Schema({
  startDate: {type: String},
  endDate: {type: String},
});

module.exports = mongoose.model('RegistrationWindow', manageRegistrationSchema);
