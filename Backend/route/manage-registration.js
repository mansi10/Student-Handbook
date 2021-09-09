/**
* Author: Gurleen Saluja (gr997570@dal.ca)
*/
const express = require('express');
const router = express.Router();
const ManageRegistration = require('../model/manage-registration');

/* Finds date already registered. */
router.get('/', (req, res, next) => {
  try {
      ManageRegistration.findOne()
          .then((registrationDetails) => {
              var response = {
                  'message': "Dates retrieved successfully.",
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

/* Saves dates to the database. */
router.post('/', (req, res, next) => {
    try {
      var request = req.body;
      const registration = new ManageRegistration({
        startDate: request.startDate,
        endDate: request.endDate
      });
      registration.save().then(() => {
          var response = {
              'message': "Dates recorded successfully.",
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

/* Deletes dates from the database. */
router.delete('/:id', (req, res, next) => {
    try {
        var id = req.params.id
        ManageRegistration.deleteOne({ _id: id })
            .then(() => {
                var response = {
                    'message': "Registration window closed successfully.",
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

module.exports = router;
