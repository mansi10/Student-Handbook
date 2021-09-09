/* 
 * Author: Mansi Singh 
 * Email id: mn518448@dal.ca
*/

//imports
const mongoose = require('mongoose')

//model schema for application feedback
// schema includes details such as application usage frequency, most liked features, rating, feedback description and timestamp
const appFeedbackSchema =  mongoose.Schema({
  usageFrequency: {type: String, default: "", required: true},
  mostLikedFeature: {type: [String], default: [], required: true},
  rating: {type: String, default: "", required: true},
  feedbackDescription: {type: String, default: "", required: true},
  submittedOn: { type: Date, default: Date.now() }
})

module.exports =mongoose.model('ApplicationFeedback',appFeedbackSchema)