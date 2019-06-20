"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
function applyBodyParser(app) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}
const appliers = [applyBodyParser];
function ApplyAll(app) {
    appliers.forEach((applier) => applier(app));
}
const ApplyMiddlewares = ApplyAll;
exports.default = ApplyMiddlewares;
//# sourceMappingURL=index.js.map