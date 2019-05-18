import express from 'express';
import ApiController from '../../model/apiController'

const router: express.Router = express.Router();
const url: string = "/test";

router.get('/test', (req, res, next) => {
    res.json({
        test: "is working :)"
    });
    next();
});



module.exports = new ApiController(router, url);