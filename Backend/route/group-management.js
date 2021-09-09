const express = require('express')
const GroupFormation = require('../model/group-management')
const router = express.Router();
const PeerMentorshipRegistrationDetail = require('../model/peer-mentorship-registration');


const getMentee = require('../data/getMentee')

// this method is used to get the list of existing groups
router.get('/groups', (req, res, next) => {
    try {
        GroupFormation.find()
            .then((goups) => {
                var response = {
                    'message': "Groups retrived successfully.",
                    'status': true,
                    'data': goups
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

// this method is used to get the list of active mentees based on the search criteria
// the search needs to be sent as URL parameter 
router.get('/mentees/:citeria/:value', (req, res, next) => {
    try {
        const criteria = req.params.citeria;
        const value = req.params.value;
        let temp
        if (value != "ALL") {
            if (criteria == "faculty") { temp = { faculty: value, role: "Mentee", group: null, requestStatus: 'Approved' } }
            else if (criteria == "location") { temp = { campusLocation: value, role: "Mentee", group: null, requestStatus: 'Approved' } }
        }
        else {
            temp = { role: "Mentee", group: null, requestStatus: 'Approved' }
        }

        PeerMentorshipRegistrationDetail.find(temp)
            .then((goups) => {
                var response = {
                    'message': "Mentees retrived successfully.",
                    'status': true,
                    'data': goups
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

// this method is used to get the mentees in a group
// the group id will sent in the URL parameter
router.get('/mentees/:groupId', (req, res, next) => {
    try {
        const Id = req.params.groupId;
        PeerMentorshipRegistrationDetail.find({ role: "Mentee", "group.groupId": Id })
            .then((mentees) => {
                var response = {
                    'message': "Mentees retrived successfully.",
                    'status': true,
                    'data': mentees
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

// this method is used to create a new group
// groupName, location, faculty needs to be passed in the body
router.post('/create', (req, res, next) => {
    try {
        console.log("create group")
        const request = req.body
        if (request && request.groupName) {
            console.log(request)

            var groupSchema = new GroupFormation({
                groupName: request.groupName,
                location: request.location,
                faculty: request.faculty,
            })

            groupSchema.save()
                .then((goups) => {
                    for (let mentee in request.mentee) {
                        let temp_group = [{
                            groupId: groupSchema._id,
                            groupName: groupSchema.groupName
                        }]
                        PeerMentorshipRegistrationDetail.findOneAndUpdate({ _id: request.mentee[mentee].menteeId }, { group: temp_group })
                            .then(() => {
                                var response = {
                                    'message': "Group Added successfully.",
                                    'status': true
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
                                return res.status(500).json(response)
                            })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    var response = {
                        'message': "Something went wrong.",
                        'error': error,
                        'status': false
                    }
                    res.status(500).json(response)
                });
        }
        else {
            var response = {
                'message': "Incorrect Request.",
                'status': false
            }
            res.status(400).json(response)

        }

    } catch (error) {
        var response = {
            'message': "Something went wrong.",
            'error': error,
            'status': false
        }
        res.status(500).json(response)

    }
});

// this method is used to update the existing group details or add mentees to the group
// group id, roupName, location, faculty needs to be passed in the body to update the group details
// along with the list of mentees. the mentees are added or removed from the group based on the flag.
// mentee with empty flag is ignored
// mentee with A flag is added
// mentee with R flag is removed
router.put('/update', (req, res, next) => {
    try {
        console.log(req.body)
        const request = req.body
        if (request._id) {
            GroupFormation.findOneAndUpdate({ _id: request._id }, { groupName: request.groupName, location: request.location, faculty: request.faculty })
                .then((groups) => {
                    for (let mentee in request.mentee) {
                        let temp_group = []
                        if (request.mentee[mentee].flag == "") {
                            continue;
                        }
                        else if (request.mentee[mentee].flag == "A") {
                            temp_group = [{
                                groupId: request._id,
                                groupName: request.groupName
                            }]
                        }
                        else if (request.mentee[mentee].flag == "R") {
                            temp_group = null
                        }
                        PeerMentorshipRegistrationDetail.findOneAndUpdate({ _id: request.mentee[mentee].menteeId }, { group: temp_group })
                            .then(() => {
                                var response = {
                                    'message': "Group Updated successfully.",
                                    'status': true
                                }
                                res.status(200).json(response)
                            })
                            .catch((error) => {
                                console.log(error)
                                var response = {
                                    'message': "Something went wrong.",
                                    'error': error,
                                    'status': false
                                }
                                return res.status(500).json(response)
                            })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    var response = {
                        'message': "Something went wrong.",
                        'error': error,
                        'status': false
                    }
                    res.status(500).json(response)
                });
        }
        else {
            var response = {
                'message': "Incorrect Request.",
                'status': false
            }
            res.status(400).json(response)
        }
    } catch (error) {
        console.log(error)
        var response = {
            'message': "Something went wrong.",
            'error': error,
            'status': false
        }
        res.status(500).json(response)
    }
});

// this method is used to delete a group
// group id needs to be passed in the URL parameter
// all the mentees in the group will be released
router.delete('/delete/:id', (req, res, next) => {
    try {
        const id = req.params.id
        if (id) {
            GroupFormation.deleteOne({ _id: id })
                .then((groups) => {
                    PeerMentorshipRegistrationDetail.updateMany({ "group.groupId": id }, { group: null })
                        .then(() => {
                            var response = {
                                'message': "Group deleted successfully.",
                                'status': true
                            }
                            res.status(200).json(response)
                        })
                        .catch((error) => {
                            console.log(error)
                            var response = {
                                'message': "Something went wrong.",
                                'error': error,
                                'status': false
                            }
                            return res.status(500).json(response)
                        })

                })
                .catch((error) => {
                    console.log(error)
                    var response = {
                        'message': "Something went wrong.",
                        'error': error,
                        'status': false
                    }
                    res.status(500).json(response)
                });
        }
        else {
            var response = {
                'message': "Incorrect Request.",
                'status': false
            }
            res.status(400).json(response)

        }

    } catch (error) {
        console.log(error)
        var response = {
            'message': "Something went wrong.",
            'error': error,
            'status': false
        }
        res.status(500).json(response)

    }
});

// this method is used to get the list of mentors 
router.get('/mentors', (req, res, next) => {
    try {
        PeerMentorshipRegistrationDetail.find({ role: "Mentor" })
            .then((goups) => {
                var response = {
                    'message': "Mentors retrived successfully.",
                    'status': true,
                    'data': goups
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

// this method is used to assign a mentor a group
// group id, group name, mentor id needs to be pass in the body to update the group
router.post('/assign-mentor', (req, res, next) => {
    try {
        console.log("assign mentor")
        const request = req.body
        if (request._id) {
            GroupFormation.findOneAndUpdate({ _id: request._id }, { mentor: request.oldMentorValue })
                .then((goups) => {
                    let temp_group = [{
                        groupId: request._id,
                        groupName: request.groupName
                    }]
                    if (request.oldMentorValue == "un-assigned") {
                        PeerMentorshipRegistrationDetail.findOneAndUpdate({ _id: request.mentor }, { group: temp_group })
                            .then(() => {
                                var response = {
                                    'message': "Mentor Assigned successfully.",
                                    'status': true
                                }
                                res.status(200).json(response)

                            })
                            .catch((error) => {
                                console.log(error)
                                var response = {
                                    'message': "Something went wrong.",
                                    'error': error,
                                    'status': false
                                }
                                return res.status(500).json(response)
                            })
                    }
                    else {
                        PeerMentorshipRegistrationDetail.findOneAndUpdate({ _id: request.oldMentorValue }, { group: temp_group })
                            .then(() => {
                                if (request.mentor != "un-assigned") {
                                    PeerMentorshipRegistrationDetail.findOneAndUpdate({ _id: request.mentor }, { group: null })
                                        .then(() => {
                                            var response = {
                                                'message': "Mentor Assigned successfully.",
                                                'status': true
                                            }
                                            res.status(200).json(response)
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            var response = {
                                                'message': "Something went wrong.",
                                                'error': error,
                                                'status': false
                                            }
                                            return res.status(500).json(response)
                                        })
                                }
                                else {
                                    var response = {
                                        'message': "Mentor Assigned successfully.",
                                        'status': true
                                    }
                                    res.status(200).json(response)

                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                var response = {
                                    'message': "Something went wrong.",
                                    'error': error,
                                    'status': false
                                }
                                return res.status(500).json(response)
                            })
                    }

                })
                .catch((error) => {
                    console.log(error)
                    var response = {
                        'message': "Something went wrong.",
                        'error': error,
                        'status': false
                    }
                    res.status(500).json(response)
                });
        }
        else {
            var response = {
                'message': "Incorrect Request.",
                'status': false
            }
            res.status(400).json(response)

        }

    } catch (error) {
        console.log(error)
        var response = {
            'message': "Something went wrong.",
            'error': error,
            'status': false
        }
        res.status(500).json(response)

    }
});

module.exports = router