"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiUrl = "/api";
const routers = [
    require('./test/test'),
    require('./home/home')
];
let router = express.Router();
routers.forEach((element) => {
    router.use(apiUrl + element.url, element.router);
});
module.exports = router;
//# sourceMappingURL=index.js.map