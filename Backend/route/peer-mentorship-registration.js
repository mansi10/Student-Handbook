/**
* Author: Gurleen Saluja (gr997570@dal.ca)
*/
const express = require('express');
const router = express.Router();
const PeerMentorshipRegistrationDetail = require('../model/peer-mentorship-registration');

/*
  Finds all the data from the specified document and returns the response.
  In case of error, returns appropriate error response.
*/
router.get('/', (req, res, next) => {
  try {
      PeerMentorshipRegistrationDetail.find()
          .then((requestDetails) => {
              var response = {
                  'message': "Requests retrieved successfully.",
                  'status': true,
                  'data': requestDetails
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

/*
  Finds data corresponding to particular email from the specified document
  and returns the response. In case of error, returns appropriate error response.
*/
router.get('/:email', (req, res, next) => {
  try {
      PeerMentorshipRegistrationDetail.findOne({email:req.params.email})
          .then((registrationDetails) => {
              var response = {
                  'message': "User retrieved successfully.",
                  'status': true,
                  'data': registrationDetails
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

/*
  Updates data corresponding to the given id in the specified document and returns the response.
  In case of error, returns appropriate error response.
*/
router.put('/:id', (req, res, next) => {
    try {
      var request = req.body;
      PeerMentorshipRegistrationDetail.findOneAndUpdate({_id: req.params.id}, {
        role: request.role,
        requestDate: request.requestDate,
        requestType: request.requestType,
        requestStatus: request.requestStatus,
        modificationDate: request.modificationDate,
        isRegistered: request.isRegistered
      })
      .then(() => {
          var response = {
              'message': "Request updated successfully.",
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

/*
  Adds data to the document.
  In case of error, returns appropriate error response.
*/
router.post('/', (req, res, next) => {
    try {
      var request = req.body;
      const registration = new PeerMentorshipRegistrationDetail({
        email: request.email,
        name: request.name,
        role: request.role,
        faculty: request.faculty,
        program: request.program,
        startDate: request.startDate,
        endDate: request.endDate,
        location: request.location,
        preference: request.preference,
        campusLocation: request.campusLocation,
        requestType: request.requestType,
        requestDate: request.requestDate,
        requestStatus: request.requestStatus,
        modificationDate: request.modificationDate,
        isRegistered: request.isRegistered,
        group: null
      });
      registration.save().then(() => {
          var response = {
              'message': "User registered successfully.",
              'status': true
          }
          res.status(201).json(response);
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

/*
  Deletes data corresponding to the given id from the specified document and returns the response.
  In case of error, returns appropriate error response.
*/
router.delete('/:id', (req, res, next) => {
    try {
        var id = req.params.id
        PeerMentorshipRegistrationDetail.deleteOne({ _id: id })
            .then(() => {
                var response = {
                    'message': "User removed from the program successfully.",
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

/*
 * Author: Mansi Singh
 * Email id: mn518448@dal.ca
*/

// this method is used for fetching peer mentorship program details belonging to a user
// user email id needs to be sent in the URL parameter
router.get('/getApprovedUser/:email', (req, res, next) => {
    try {
        PeerMentorshipRegistrationDetail.findOne({email:req.params.email, requestStatus: "Approved" })
            .then((registrationDetails) => {
                var response = {
                    'message': "User retrieved successfully.",
                    'status': true,
                    'data': registrationDetails
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

 module.exports = router;
