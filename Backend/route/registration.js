const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const Registration = require('../model/registration');
const jwt = require('jsonwebtoken');

//Get all the user information to be displayed at the user profile.
router.get('/', (req, res, next) => {
    try {
        Registration.find()
            .then((users) => {
                var response = {
                    'message': "Users retrived successfully.",
                    'status': true,
                    'data': users
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
    } catch (error) {
        var response = {
            'message': "Something went wrong.",
            'error': error,
            'status': false
        }
        res.status(500).json(response)
    }
});

//Get the user information for a particular user.
//User email-id need to be passed in the URL parameter.
router.get('/:email', (req, res, next) => {
  try {
      Registration.findOne({email:req.params.email})
          .then((user) => {
              var response = {
                  'message': "User retrieved successfully.",
                  'status': true,
                  'data': user
              }
              res.status(200).json(response);
          })
          .catch((error) => {
              var response = {
                  'message': "Something went wrong.",
                  'error': error,
                  'status': false
              }
              res.status(500).json(response);
          });
  } catch (error) {
      var response = {
          'message': "Something went wrong.",
          'error': error,
          'status': false
      }
      res.status(500).json(response);
  }
});

//Checks whether user email-id already exists.
//If user id is unique, then user is registered to the application and information is updated to the database. 
router.post('/signup', (req, res, next) => {
    var request = req.body
    console.log(request)
    Registration.find({ email: request.email }).exec()
        .then(register => {
            if (register.length >= 1) {
                return res.status(409).json({
                    message: 'Email Id already exists',
                    status: false
                })
            }
            else {
                bcrypt.hash(request.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            'message': "Something went wrong.",
                            'error': err,
                            'status': false
                });
                    }
                    else {
                        const register = new Registration({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: request.firstName,
                            lastName: request.lastName,
                            email: request.email,
                            password: hash,
                            friend: request.friend,
                            pet: request.pet
                        });
                        //console.log(register)
                        register.save()
                            .then(() => {
                                var response = {
                                    'message': "Registration successfull.",
                                    'status': true,
                                    'data': register
                                }
                                res.status(201).json(response)
                            })
                            .catch((error) => {
                                console.log(error)
                                var response = {
                                    'message': "Something went wrong.",
                                    'error': error,
                                    'status': false
                                }
                                res.status(500).json(response)
                            })
                    }
                })
            }
        }).catch((error)=>{
            console.log(error)
            return res.status(500).json({
                message: 'Something went wrong!',
                status: false
            })
        });
});

//User needs to enter registered email id and password to access rest of the features in the application.
router.post('/login', (req, res, next) => {
    Registration.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authorization failed',
                    status:false
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authorization failed',
                        status:false
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                        },
                        "" + process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    )
                    return res.status(200).json({
                        message: 'Authorization successful',
                        token: token ,
                        data: {
                            _id: user[0]._id,
                            email: user[0].email,
                            firstName: user[0].firstName,
                            lastName: user[0].lastName,
                            role: user[0].role
                        },
                        status:true
                    });
                }
                else{
                    res.status(200).json({
                        message: 'Authorization failed',
                        status: false
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

//At present, user isn't allowed to delete the profile.
//But, if admin wants to delete the profile, delete feature can be used.
router.delete('/:id', (req, res, next) => {
    Registration.remove({ _id: req.params.id }).exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

module.exports = router