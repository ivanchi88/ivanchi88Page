var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV == "produccion") {
    require('dotenv').config();
}

app.use('/static', express.static(__dirname + '/static'));

// viewed at http://localhost:PORT
app.get('/static', function(req, res) {
    res.sendFile(__dirname + '/static/html/index.html');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 

