"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = __importDefault(require("../../model/apiController"));
const router = express_1.default.Router();
const url = "/test";
router.get('/test', (req, res, next) => {
    res.json({
        test: "is working :)"
    });
    next();
});
module.exports = new apiController_1.default(router, url);
//# sourceMappingURL=test.js.map