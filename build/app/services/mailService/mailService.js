"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MailDto_1 = require("../../model/Mail/MailDto");
const fs_1 = __importDefault(require("fs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const MAIL_TEMPLATES_DIR = process.env.ROOTDIR + "/static/utilities/mailTemplates/";
const credentials = {
    user: process.env.MAILADDRESS,
    pass: process.env.MAILPASSWORD
};
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: credentials,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});
const sendMail = function (mail) {
    transporter.sendMail({
        from: credentials.user,
        to: mail.destinatary,
        subject: mail.subject || "subject",
        html: mail.message
    });
};
const sendContactMail = function (data) {
    const text = readFile("contactMail.txt");
    const subtitutions = [
        "@firstName", data.senderFirstName || "",
        "@secondName", data.senderLastName || "",
        "@subject", data.subject || "",
        "@email", data.sender || "",
        "@message", data.message || ""
    ];
    const mailMessage = getMessageFromTemplate(text, subtitutions);
    const mail = new MailDto_1.MailDto({
        destinatary: process.env.MAILRECEIVER,
        files: undefined,
        subject: data.subject,
        message: mailMessage
    });
    sendMail(mail);
};
const readFile = function (filename) {
    return fs_1.default.readFileSync(MAIL_TEMPLATES_DIR + filename, 'utf8');
};
const getMessageFromTemplate = function (originalMessage, substitutions) {
    if (substitutions.length % 2 !== 0) {
        throw new Error("The substitutions must be a pair collection");
    }
    let message = originalMessage;
    for (let i = 0; i < substitutions.length; i = i + 2) {
        message = message.replace(substitutions[i], substitutions[i + 1]);
    }
    return message;
};
const Mailer = {
    SendMail: sendMail,
    SendContactMail: sendContactMail
};
exports.default = Mailer;
//# sourceMappingURL=mailService.js.map