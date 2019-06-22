"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
if (process.env.NODE_ENV != "produccion") {
    require('dotenv').config();
}
process.env.ROOTDIR = __dirname;
const api = require('./app/controller/api');
const app = express_1.default();
//ApplyMiddlewares.default(app);
app.use(express_1.default.json());
if (process.env.NODE_ENV != "produccion") {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
app.use('/', express_1.default.static(__dirname + '/static'));
app.use('/', express_1.default.static(__dirname + '/static/angular'));
// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/angular/index.html');
});
app.get('/old-home', function (req, res) {
    res.sendFile(__dirname + '/static/html/index.html');
});
const port = process.env.PORT || "1234";
app.use(api);
app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});
//# sourceMappingURL=index.js.map