/* 
 * Author: Misbah Pathan 
 * Email id: ms358232@dal.ca
*/

const mongoose = require('mongoose')

const registrationSchema =  mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  firstName: {type: String, required: true},
  lastName: {type: String,  required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  friend: {type: String, required: true},
  pet: {type: String, required: true},
  role: {type: String, default: ''}

})

module.exports = mongoose.model('Registration', registrationSchema)