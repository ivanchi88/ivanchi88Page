var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(proccess.env.PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});