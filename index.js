var http = require('http');

http.creatServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello world");
}).listen(proccess.env.PORT);