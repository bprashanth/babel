const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1'; // Localhost
const port = 3000; // Default port

const server = http.createServer((req, res) => {
    console.log("request path is " + req.url)
    let fileName = 'index.html';
    if (req.url === '/streamer.js') {
        fileName = 'streamer.js';
    }
    fs.readFile(fileName, 'utf8', (err, content) => {
        if (err) {
        console.error(err);
        res.statusCode = 404;
        res.end('File not found');
        } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
        }
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});