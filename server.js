var express = require ('express');
var morgan = require ('morgan');
var app = express ();

//Middleware
app.use (morgan ('dev'));


//create home url
app.get ('/', function (req, res) {
  var name = "John"
  res.json ("My name is " + name);
});

app.get ('/catname', function (re, res) {
  res.json ('batman');
});

app.listen (3000, function (err) {
  if (err) throw err;
  console.log ("Server is Running on port 3000");
});
