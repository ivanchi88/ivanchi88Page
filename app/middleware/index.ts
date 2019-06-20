import Express from 'express'
import bodyParser = require('body-parser');


function applyBodyParser (app: Express.Application) : void {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
}

const appliers: Function [] = [applyBodyParser];

function ApplyAll (app: Express.Application): void { 
    appliers.forEach((applier: Function) => applier(app)); 
}

const ApplyMiddlewares : Function = ApplyAll;


export default ApplyMiddlewares;