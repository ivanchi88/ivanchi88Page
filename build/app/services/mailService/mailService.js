"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const credentials = {
    user: process.env.MAILADDRESS,
    pass: process.env.MAILPASSWORD
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: credentials,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});
const sendMail = function (data) {
    console.log(credentials);
    transporter.sendMail({
        from: credentials.user,
        to: "ivanchi88@gmail.com",
        subject: data.subject || "subject",
        text: JSON.stringify(data)
    });
};
const Mailer = {
    SendMail: sendMail
};
exports.default = Mailer;
//# sourceMappingURL=mailService.js.map