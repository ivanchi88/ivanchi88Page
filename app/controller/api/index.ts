import express = require('express');
import ApiController from '../model/apiController';

const apiUrl : string = "/api";

const routers : ApiController [] = [
    require('./test/test'),
    require('./home/home')
]

let router: express.Router = express.Router();

routers.forEach((element: ApiController)=> {
    router.use(apiUrl + element.url, element.router);
});

module.exports = router;