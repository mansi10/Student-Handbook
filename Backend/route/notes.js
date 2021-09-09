const express = require('express')
const noteData = require('../data/notes')
const router = express.Router();

const Notes = require('../model/notes')

// this method is used to get the list of notes for a particular user
// user id need to be passed in the URL parameter
router.get('/:id', (req, res, next) => {
    try {
        const id = req.params.id
        Notes.find({ createdByID: id })
            .then((notes) => {
                var response = {
                    'message': "Note retrived successfully.",
                    'status': true,
                    'data': notes
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

// this method is used to create the note 
// title, tags, content, createdByID need to be passed in the body
router.post('/', (req, res, next) => {
    try {
        var request = req.body
        const note = new Notes({
            title: request.title || "Note",
            tags: request.tags,
            content: request.content,
            createdByID: request.createdByID
        })
        note.save()
            .then(() => {
                var response = {
                    'message': "Note added successfully.",
                    'status': true
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

// this method is used to update the notes details
// note id  needs to be passed in the URL parameter
// title, tags, content, createdByID need to be passed in the body
router.put('/:id', (req, res, next) => {
    try {
        var id = req.params.id
        var request = req.body

        Notes.findOneAndUpdate({ _id: id }, request)
            .then(() => {
                var response = {
                    'message': "Note updated successfully.",
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

// this method is used to delete the group
// group id need to be passed in the URL parameter
router.delete('/:id', (req, res, next) => {
    try {
        var id = req.params.id
        Notes.deleteOne({ _id: id })
            .then(() => {
                var response = {
                    'message': "Note deleted successfully.",
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

module.exports = router