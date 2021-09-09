/* 
 * Author: Mansi Singh 
 * Email id: mn518448@dal.ca
*/

//imports
const express= require('express');
var MentorFeedback = require('../model/mentorFeedback');
var AppFeedback = require('../model/applicationFeedback');

const router= express.Router(); 

// this method is used to submit a feedback for the mentor
// feedback details such as mentor name, rating, feedback description, and timestamp needs to be passed as a request body
router.post('/mentor', (req,res,next)=>{
    
    try{
        var request = req.body;
        request.feedbackDescription= request.feedbackDescription.trim() // spaces are trimmed from the description before setting it in the request payload

        const mentorFeedback = new MentorFeedback({
            mentorName: request.mentorName,
            rating: request.rating,
            feedbackDescription: request.feedbackDescription,
            submittedOn: request.submittedOn
        })

        mentorFeedback.save()
        .then(result => {
            var response = {
                'message': "Feedback for mentor submitted successfully.",
                'status': true,
                'result':result
            }
            res.status(201).json(response)
        })
        .catch((error) => {
            var response = {
                'message': "Something went wrong.",
                'status': false,
                'error': error
            }
            res.status(500).json(response)
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
})

// this method is used to submit a feedback for the web application
// feedback details such as application usage frequency, most liked features, rating, feedback description, and timestamp needs to be passed as a request body
router.post('/application', (req,res,next)=>{
    
    try{
        var request = req.body;
        request.feedbackDescription= request.feedbackDescription.trim() // spaces are trimmed from the description before setting it in the request payload

        const appFeedback = new AppFeedback({
            usageFrequency: request.usageFrequency,
            mostLikedFeature: request.mostLikedFeature,
            rating: request.rating,
            feedbackDescription: request.feedbackDescription,
            submittedOn: request.submittedOn
        })

        appFeedback.save()
        .then(result => {
            var response = {
                'message': "Feedback for application submitted successfully.",
                'status': true,
                'result':result
            }
            res.status(201).json(response)
        })
        .catch((error) => {
            var response = {
                'message': "Something went wrong.",
                'status': false,
                'error': error
            }
            res.status(500).json(response)
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
})

module.exports = router;