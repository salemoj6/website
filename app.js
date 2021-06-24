const express = require('express');
const app = express();
const port = 3000;
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jsalemo252@gmail.com',
    pass: 'pokemonres25'
  }
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100
});

app.use(bodyParser.urlencoded({extended: false}));

// Define the static file path
app.use(express.static(__dirname+'/public'));

app.use(helmet());
app.use(limiter);

app.get('/', function (req, res) {
  res.sendFile(__dirname + 'public/index.html');
})

app.get('public/action', function (req, res) {
  var mailOptions = {
    from: 'jsalemo252@gmail.com',
    to: 'salemoj6@students.rowan.edu,
    subject: 'Contact from PC maker business',
    text: 'test'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.listen(port, () => console.log('The server running on Port '+port));
