"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiController_1 = __importDefault(require("../../model/apiController"));
const mailService_1 = __importDefault(require("../../../services/mailService/mailService"));
const router = express_1.default.Router();
const url = "/home";
router.post('/sendContactEmail', (req, res, next) => {
    let contactData = req.body;
    mailService_1.default.SendMail(contactData);
    res.sendStatus(200);
    next();
});
module.exports = new apiController_1.default(router, url);
//# sourceMappingURL=home.js.map