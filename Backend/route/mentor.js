const express = require('express');

const router = express.Router();
const Mentor = require('../model/mentor')



router.get('/', (req, res, next) => {
    try {
        Mentor.find()
            .then((mentors) => {
                var response = {
                    'message': "Users retrived successfully.",
                    'status': true,
                    'data': mentors
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

module.exports = router;