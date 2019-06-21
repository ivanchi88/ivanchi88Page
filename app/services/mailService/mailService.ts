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

const contactMailTemplate : string = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>A Simple Responsive HTML Email</title>
        <style type="text/css">
        body {margin: 0; padding: 0; min-width: 100%!important;}
        .content {width: 100%; max-width: 600px;}  
        </style>
    </head>
    <body yahoo bgcolor="#F7F7F7">
        <table width="100%" bgcolor="#F7F7F7" class="content" align="center" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>First Name</td>
                <td>@firstName</td>
            </tr>

            <tr>
                <td>Second Name</td>
                <td>@secondName</td>
            </tr>

            <tr>
                <td>Subject</td>
                <td>@subject</td>
            </tr>

            <tr>
                <td>Email</td>
                <td>@email</td>
            </tr>

            <tr>
                <td>Message</td>
                <td>@message</td>
            </tr>
        </table>
    </body>
</html>
`

const sendMail : Function = function(data : ContactData) { 
    transporter.sendMail({
        from: credentials.user,
        to: process.env.MAILRECEIVER,
        subject: data.subject ||"subject",
        html: getMessageFromTemplate(contactMailTemplate, data)
    });
}

const  getMessageFromTemplate = function(message: string, data: ContactData){
    message = message.replace("@firstName", data.senderFirstName  || "");
    message = message.replace("@secondName", data.senderLastName || "");
    message = message.replace("@subject", data.subject || "");
    message = message.replace("@email", data.sender || "");
    message = message.replace("@message", data.message || "");
    return message;
}


const Mailer: any = {
    SendMail : sendMail
}

export default Mailer;
