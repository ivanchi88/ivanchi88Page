import express from 'express';
import ApiController from '../../model/apiController'

const router: express.Router = express.Router();
const url: string = "/test";

router.get('/test', (req, res, next) => {
    res.send(`<h2>Hello Cago en to</h2>`);
    next();
});

module.exports = new ApiController(router, url);