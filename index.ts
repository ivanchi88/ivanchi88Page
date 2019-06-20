import Express from 'express';
import ApplyMiddlewares = require('./app/middleware');

if(process.env.NODE_ENV != "produccion") {
    require('dotenv').config(); 
}

const api = require('./app/controller/api');
const app: Express.Application = Express();

//ApplyMiddlewares.default(app);
app.use(Express.json());
if (process.env.NODE_ENV != "produccion") {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
}

app.use('/', Express.static(__dirname + '/static'));
app.use('/', Express.static(__dirname + '/static/angular'));

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