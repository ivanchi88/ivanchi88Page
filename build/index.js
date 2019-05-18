"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const api = require('./app/controller/api');
const app = express();
app.use('/static', express.static(__dirname + '/static'));
// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/static/html/index.html');
});
const port = process.env.PORT || "1234";
app.use(api);
app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});
//# sourceMappingURL=index.js.map