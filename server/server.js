import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

var Application = require('../build/bin/app.js');         

let app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));

app.get("/", (req, res) =>{        
    var file = req.params.file;
    res.setHeader('Content-Type', 'text/html');
    var stream = fs.createReadStream('./build/index.html');
    stream.on('error', function(err){		
        res.send("no file")
    });		
    stream.pipe(res);
});

app.get("/css/:file", (req, res) =>{        
    var file = req.params.file;
    res.setHeader('Content-Type', 'text/css');
    var stream = fs.createReadStream('./build/css/' + file);
    stream.on('error', function(err){		
        res.send("no file")
    });		
    stream.pipe(res);
});

app.get("/static/js/:file", (req, res) =>{        
    var file = req.params.file;
    res.setHeader('Content-Type', 'text/css');
    var stream = fs.createReadStream('./build/static/js/' + file);
    stream.on('error', function(err){		
        res.send("no file")
    });		
    stream.pipe(res);
});

Application.Start(app);    

let server = http.createServer(app);
let port = 3001;

server.listen(port, () => {
    console.log(`Gulp is running the app on port ${port} (localhost:${port})`);
});