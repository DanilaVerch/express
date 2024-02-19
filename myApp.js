let express = require('express');
require('dotenv').config();
let app = express();
let bodyParser = require("body-parser");

console.log("Hello World");

app.get("/", function(req, res) {
  const absPath = __dirname + "/views/index.html";
  res.sendFile(absPath);
})

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({ message });
});


function requestLogger(req, res, next) {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
  next();
}

app.use(requestLogger);


app.get("/now", function dateTime (req, res, next){
  req.time = new Date().toString();
  next();
}, function (req, res){
  res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
  const {word} = req.params;
  res.json ({
    echo: word
  });
});


app.post("/name", (req, res) => {
  const { first, last } = req.body;
  if (!first || !last) {
    return res.status(400).json({ error: "Both 'first' and 'last' parameters are required." });
  }
  res.json({
    name: `${first} ${last}`
  });
});




















 module.exports = app;
