//imports
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const notesRoute = require('./route/notes');
const registrationRoute = require('./route/registration');
const groupMangementRoute = require('./route/group-management')
const announcementRoute = require('./route/announcements');
const feedbackRoute = require('./route/feedback');
const forgotPassword = require('./route/forgotpwd');
const updateProfile = require('./route/updateProfile');

const peerMentorshipRegistrationRoute = require('./route/peer-mentorship-registration');
const modifyMemberRoute = require('./route/modify-member');
const manageRegistration = require('./route/manage-registration');
const mentor = require('./route/mentor');

const app = express();
const rootRoute = '/api'

//for setting up mongoDB Connection
mongoose.connect('mongodb+srv://admin:admin@group12.yeppi.mongodb.net/StudentHandbook?retryWrites=true&w=majority')
.then(()=>{
  console.log("connected to mongoDB")
})
.catch(()=>{
  console.log("mongoDB connection failed")
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")
  next();
})

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
app.use(bodyParser.json())

app.use(rootRoute+'/notes', notesRoute);

app.use(rootRoute+'/registration', registrationRoute);

app.use(rootRoute+'/forgotpassword', forgotPassword);

app.use(rootRoute+'/group-management', groupMangementRoute);

app.use(rootRoute + '/announcements', announcementRoute);

app.use(rootRoute + '/feedback', feedbackRoute);

app.use(rootRoute+'/peer-mentorship-registration', peerMentorshipRegistrationRoute);

app.use(rootRoute+'/modify-member', modifyMemberRoute);

app.use(rootRoute+'/manage-registration', manageRegistration);

app.use(rootRoute+'/updateprofile', updateProfile);

app.use(rootRoute+'/mentor', mentor);

// All routes need to be added above this comment
app.use('/',(req, res) =>{
  var response = {
    'message': "Please Check the Service URL.",
    'status': false
}
  res.status(404).json(response)
})



module.exports = app;
