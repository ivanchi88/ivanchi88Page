import { ContactData } from "../../model/contactFolder/contactData";

const nodemailer = require("nodemailer");

const credentials : any = {
        user: process.env.MAILADDRESS,
        pass: process.env.MAILPASSWORD
}

const transporter: any = nodemailer.createTransport({
    service: 'gmail',
    auth: credentials,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail : Function = function(data : ContactData) {
    console.log(credentials)
    transporter.sendMail({
        from: credentials.user,
        to: "ivanchi88@gmail.com",
        subject: data.subject ||"subject",
        text: JSON.stringify(data)
    });
}

const Mailer: any = {
    SendMail : sendMail
}

export default Mailer;
