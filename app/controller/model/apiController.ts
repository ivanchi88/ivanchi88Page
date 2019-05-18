import express from 'express'

export default class ApiController {
    router!: express.Router;
    url!: string;

    public constructor (router: express.Router, url: string) {
        this.router = router;
        this.url = url;
    }
}