// index.js
// where your node app starts

// init project
require('dotenv').config()
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoints...
app.get("/api", function (req, res) {
  let date = new Date();
  res.json({"unix": date.getTime(), "utc": date.toUTCString()})
})

app.get("/api/:date", function (req, res) {
  try {
    let date = new Date(req.params.date);
    if (date == 'Invalid Date') {
      date = new Date(parseInt(req.params.date))
    }
    if (date == 'Invalid Date') {
      throw "Invalid Date"
    }
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  } catch (e) {
    res.json({"error": "Invalide Date"})
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
