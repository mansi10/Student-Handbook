/* 
 * Author: Mansi Singh 
 * Email id: mn518448@dal.ca
*/

//imports
const mongoose = require('mongoose')

//model schema for mentor feedback
//schema includes details such as mentor name, rating, feedback description, and timestamp
const mentorFeedbackSchema =  mongoose.Schema({
  mentorName: {type: String, default: "", required: true},
  rating: {type: String, default: "", required: true},
  feedbackDescription: {type: String, default: "", required: true},
  submittedOn: { type: Date, default: Date.now() }
})

module.exports =mongoose.model('MentorFeedback',mentorFeedbackSchema)