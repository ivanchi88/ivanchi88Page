import { ContactData } from "../../model/contactFolder/contactData";
import { MailDto } from "../../model/Mail/MailDto";
import fs from 'fs';
import nodemailer from "nodemailer";

const MAIL_TEMPLATES_DIR = process.env.ROOTDIR + "/static/utilities/mailTemplates/";


const credentials : any = {
        user: process.env.MAILADDRESS,
        pass: process.env.MAILPASSWORD
}

const transporter: any = nodemailer.createTransport({
    port: 143, 
    auth: credentials,
    host: process.env.MAILHOST,
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});
const sendMail : Function = function(mail : MailDto) { 
    transporter.sendMail({
        from: credentials.user,
        to: mail.destinatary,
        subject: mail.subject ||"subject",
        html: mail.message
    }, (err: any, info: any) => {
            if (err) {
                console.error(err);
            }
            if (info) {
              console.info(info);
            }
            if (mail) {
                console.info(mail);
            }

            throw err;
    });
}

const sendContactMail : Function = function (data: ContactData) {
    const text = readFile("contactMail.txt");

    const subtitutions : string [] = [
        "@firstName", data.senderFirstName  || "",
        "@secondName", data.senderLastName || "",
        "@subject", data.subject || "",
        "@email", data.sender || "",
        "@message", data.message || ""
    ]

    const mailMessage = getMessageFromTemplate(text, subtitutions);

    const mail : MailDto = new MailDto({
        destinatary: process.env.MAILRECEIVER,
        files: undefined,
        subject: data.subject,
        message: mailMessage 
    });
    sendMail(mail); 
}

const readFile : Function = function(filename: string) { 
   return fs.readFileSync(MAIL_TEMPLATES_DIR + filename, 'utf8');
}

const  getMessageFromTemplate = function(originalMessage: string, substitutions: string []){
    if (substitutions.length % 2 !== 0) {
        throw new Error("The substitutions must be a pair collection");
    }
    let message = originalMessage;
    for (let i = 0; i < substitutions.length; i = i + 2){ 
        message = message.replace(substitutions[i], substitutions[i+1]);
    }
    return message;
}


const Mailer: any = {
    SendMail : sendMail,
    SendContactMail: sendContactMail
}

export default Mailer;
