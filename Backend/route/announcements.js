/* 
 * Author: Mansi Singh 
 * Email id: mn518448@dal.ca
*/

//imports
const express= require('express');
var Announcements = require('../model/announcements');

const router= express.Router();

// this method is used to get the list of announcements which have been created till now
router.get('/', (req,res)=>{
    try{
        Announcements.find()
            .then((announcements) => {
                var response = {
                    'message': "Announcements retrived successfully.",
                    'status': true,
                    'data': announcements
                }
                res.status(201).json(response)
            })
            .catch((error) => {
                var response = {
                    'message': "Something went wrong.",
                    'error': error,
                    'status': false
                }
                res.status(500).json(response)
            });
    }catch(err){
        return res.status(500).json({
            message: "Internal server error",
            status: false
        })
    }
    })
    
// this method is used to get a specific announcement
// announcement id need to be passed in the URL parameter
    router.get('/:id', (req,res)=>{
       try{
        const announcementId= req.params.id;
        Announcements.findOne({ _id: announcementId })
        .then((announcement) => {
            var response = {
                'message': "Announcement retrived successfully.",
                'status': true,
                'data': announcement
            }
            res.status(201).json(response)
        })
        .catch((error) => {
            var response = {
                'message': "Something went wrong.",
                'error': error,
                'status': false
            }
            res.status(500).json(response)
        });
        }catch(err){
            return res.status(500).json({
                    message: "Internal server error",
                    status: false
            })
        }
    })
    
// this method is used to create a new announcement
// announcement details such as title, category, description, details of the user who created it (user name and user id), and timestamp needs to be passed as a request body
    router.post('/', (req,res)=>{
    
        try{
            var request = req.body; 
            request.title = request.title.trim(); // spaces are trimmed from the title before setting it in the request payload
            request.description = request.description.trim(); // spaces are trimmed from the description before setting it in the request payload

            const announcement = new Announcements({
                title: request.title,
                category: request.category,
                description: request.description,
                createdByName: request.createdByName,
                createdById: request.createdById,
                createdOn: request.createdOn
            })

            // before creating a new announcement, database is checked if an announcement with the same title already exists 
            // in case the announcement does not exist in the database, further process is carried out, otherwise an error message is sent to UI 
            Announcements.findOne({title: req.body.title}, function(err, response) {
                if (err)
                    console.log(err)
                if (response && response.title == req.body.title) {
                        return res.status(409).json({
                            'message':"Announcement with this title already exists!",
                            'status' : false                    
                        })
                } else {
                    announcement.save().then(result => {
                        return res.status(201).json({
                            'message':"Announcement created successfully!",
                            'status' : true
                        })
            }).catch((error) => {
                            return res.status(500).json({
                                message : "Internal server error",
                                status : false
                            })
            })
        }
    });
     }catch(err){
            return res.status(500).json({
                message:"Internal server error",
                status: false
            })
        }
    })
    
// this method is used to update an existing announcement
// announcement id needs to be passed in the URL parameter
// announcement details (title/category/description/user details/timestamp) which are to be updated, needs to be passed as a request body 
    router.put('/:id', (req,res, next)=>{ 
    
        try{
        var id = req.params.id
        var request = req.body
        Announcements.findOneAndUpdate({ _id: id }, request)
            .then(result => {
                var response = {
                    'message': "Announcement updated successfully.",
                    'status': true,
                    'result':result
                }
                res.status(200).json(response)
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
                status: false
            })
        }
    })

// this method is used to delete a specific announcement
// announcement id need to be passed in the URL parameter
    router.delete('/:id', (req, res, next) => {
        try {
            var id = req.params.id
            Announcements.deleteOne({ _id: id })
                .then(() => {
                    var response = {
                        'message': "Announcement deleted successfully.",
                        'status': true
                    }
                    res.status(200).json(response)
                })
                .catch((error) => {
                    var response = {
                        'message': "Something went wrong.",
                        'error': error,
                        'status': false
                    }
                    res.status(500).json(response)
                })
    
        } catch (error) {
            var response = {
                'message': "Something went wrong.",
                'error': error,
                'status': false
            }
            res.status(500).json(response)
    
        }
    });

module.exports = router;