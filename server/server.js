const express = require('express')
const bodyParser = require('body-parser')
//const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const app = express()
const router = express.Router()
const cors = require('cors')
//const Storage= require('@google-cloud/storage')
// const Multer = require('multer')
const axios = require('axios')

app.use(bodyParser.json())
//app.use(methodOverride())
app.use(cors())


// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open!');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error!');
});

console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
var Schema=mongoose.Schema

var Breath = mongoose.model('Breath', new mongoose.Schema({
  meditatorId: [{
    type: Schema.Types.ObjectId,
    ref: 'Meditator',
  }],
  howWasIt: String, //JSON.stringified object
  createdAt: Date,
}))

var Meditator = mongoose.model('Meditator', new mongoose.Schema({
  createdAt: Date,
  zenName: String,
  expoNotificationToken: String, //JSON.stringified object
  location: String, // later, convert to latitutde and longitude

  currentHistory: String, //JSON.stringified object
  realName: String,
  realEmail: String,
}))


restify.serve(router, Breath)
restify.serve(router, Meditator)

app.use(router)

app.get('/getNRandomCard/:num', function(req,res) {
  console.log("getNRandomCard", new Date())
  var myPromises=[];
  for (var i=1; i<=req.params.num; i++) {
    myPromises.push(getOneImageRecordPromise())
  }
  Promise.all(myPromises).then((resultsArray)=> res.json(resultsArray))
})



let port= 31023;
app.listen(process.env.PORT || port, () => {
  console.log(`Express server listening on port ${process.env.PORT || port}`)
})
