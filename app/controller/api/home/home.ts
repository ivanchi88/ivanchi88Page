import express from 'express';
import ApiController from '../../model/apiController'
import { ContactData } from '../../../model/contactFolder/contactData';
import Mailer from '../../../services/mailService/mailService';

const router: express.Router = express.Router();
const url: string = "/home";

router.post('/sendContactEmail', (req, res, next) => {
    let contactData: ContactData = req.body;
    try {
        Mailer.SendContactMail(contactData);
    } catch (ex) {
        res.sendStatus(500);
        next();
        return;
    }
    res.sendStatus(200);
    next();
});

module.exports = new ApiController(router, url);