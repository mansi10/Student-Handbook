const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const UpdateProfile = require('../model/registration')

// this method is used to update the user details.
// user id need to be passed in the URL parameter.
// first name and last name need to be passed in the body
router.put('/:id', (req, res, next) => {
    try {
        var id = req.params.id
        var request = req.body

        UpdateProfile.findOneAndUpdate({ _id: id }, { firstName: request.firstName, lastName: request.lastName })
            .then(() => {
                var response = {
                    'message': "User Profile updated successfully.",
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

// this method checks the security questions.
// user id need to be passed in the URL parameter.
// answers of the security question needs to be passed in the body
router.post('/checkquestion/:id', (req, res, next) => {
    var id = req.params.id
    const request = req.body
    UpdateProfile.find({ _id: id, friend: request.firstQuestion, pet: request.secondQuestion }).exec()
        .then((result) => {
            console.log(result)
            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Correct Answers',
                    status: true
                });

            }
            else {
                return res.status(401).json({
                    message: 'Incorrect Answers',
                    status: false
                });
            }

        })
        .catch((error) => {
            console.log(error)
            return res.status(500).json({
                message: 'Something Went wrong',
                status: false
            });

        })
});

// this method reset the existing password of the system.
// user id need to be passed in the URL parameter.
// old password, answers of the securtiy questions, new password, and confirm password needs to be passed in the body
router.put('/resetpassword/:id', (req, res, next) => {

    try {
        var id = req.params.id

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                    message: "Something went wrong",
                    'status': false
                });
            }
            else {

                UpdateProfile.update({ _id: id }, { password: hash }, (err, user) => {
                    console.log(user)
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            message: "Something went wrong",
                            'status': false
                        });
                    }
                    else {
                        return res.status(200).json({
                            message: 'Password Updated Successfully',
                            'status': true
                        })
                    }
                })
            }
        })



    }
    catch (error) {
        var response = {
            'message': "Something went wrong.",
            'error': error,
            'status': false
        }
        res.status(500).json(response);

    }
});

module.exports = router