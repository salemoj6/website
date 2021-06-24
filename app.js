const express = require('express');
const app = express();
const port = 3000;
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

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


app.listen(port, () => console.log('The server running on Port '+port));
