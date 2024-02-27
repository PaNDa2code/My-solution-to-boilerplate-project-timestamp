// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use("/api", (req, res, next) => {
  console.log(req.method, req.hostname);
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const unixRegex = /^[0-9]{13}$/
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // create DateConstructor with the currant time
    date = new Date();
  }
  else if (dateParam.match(unixRegex)) {
    // create DateConstructor with the api unix date request input
    date = new Date(Number(dateParam))
  }
  else {
    // create DateConstructor with the api date string request input
    date = new Date(dateParam);
    // check it the date is not valid
    if (!date.getTime()) {
      // handle invalid date
      res.json({ error: "Invalid date" });
      return;
    }
  }

  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({
    unix: unix,
    utc: utc
  })
  return;
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
