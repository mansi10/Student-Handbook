const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const ForgotPassword = require('../model/registration')
const jwt = require('jsonwebtoken')


// This method is used to update the user details
// Correct email-id, and answer of the secret questions that were entered during sign-up are required to set the new password.

router.post('/', (req, res, next) => {

    console.log(req.body.email, req.body.friend, req.body.pet)
    ForgotPassword.find({$and: [{ email: req.body.email }, { friend: req.body.friend }, { pet: req.body.pet }]}).exec()
        .then(user => {

            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization failed',
                    'status': false
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            message: "Something went wrong",
                            'status': false
                        });
                    }
                    else {

                        ForgotPassword.update({ email: req.body.email }, { password: hash }, (err, user) => {

                            if(err)
                            {
                                return res.status(500).json({
                                    error: err,
                                    message: "Something went wrong",
                                    'status': false
                                });
                            }
                            else
                            {
                                return res.status(201).json({
                                    message: 'Password Updated Successfully',
                                    'data': user,
                                    'status': true
                                })
                            }
                        })
                        
                    }
                })

            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: "Something went wrong",
                'status': false
            });
        });
})

module.exports = router
