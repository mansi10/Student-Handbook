/**
* Author: Gurleen Saluja (gr997570@dal.ca)
*/
const express = require('express');
const router = express.Router();
const ModifyMember = require('../model/modify-member');

/*
  Finds all the data from the specified document and returns the response.
  In case of error, returns appropriate error response.
*/
router.get('/', (req, res, next) => {
  try {
      ModifyMember.find()
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
      ModifyMember.findOne({email:req.params.email})
          .then((requestDetails) => {
              var response = {
                  'message': "User retrieved successfully.",
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
  Updates data corresponding to the given id in the specified document and returns the response.
  In case of error, returns appropriate error response.
*/
router.put('/:id', (req, res, next) => {
    try {
      var request = req.body;
      ModifyMember.findOneAndUpdate({_id: req.params.id}, {
        role: request.role,
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
      const registration = new ModifyMember({
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
        isRegistered: request.isRegistered
      });
      registration.save().then(() => {
          var response = {
              'message': "User modified successfully.",
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

module.exports = router;
