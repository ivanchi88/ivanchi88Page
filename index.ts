import express = require('express');
const api = require('./app/controller/api');

const app: express.Application = express();


app.use('/', express.static(__dirname + '/static'));
app.use('/', express.static(__dirname + '/static/angular'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/angular/index.html');
});

app.get('/old-home', function(req, res) {
    res.sendFile(__dirname + '/static/html/index.html');
});

const port: string  = process.env.PORT || "1234";

app.use(api);

app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});