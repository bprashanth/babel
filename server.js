const http = require('http');
const fs = require('fs');
const ytdl = require('ytdl-core');
const cors = require('cors');   
const hostname = '127.0.0.1'; // Localhost
const port = 3000; // Default port

function readFile(fileName, res) {
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
}

const server = http.createServer((req, res) => {
    console.log("request path is " + req.url)
    if (req.url == '/') {
        readFile('index.html', res);
    } else if (req.url === '/streamer.js') {
        readFile('streamer.js', res);
    } else if (req.method === 'POST' && req.url === '/stream') {
        let url = '';
        req.on('data', (chunk) => {
          url += chunk;
        });
        url = 'https://www.youtube.com/watch?v=wiXXI--rr0U&ab_channel=RanveerAllahbadia'
    
        req.on('end', async () => {
          try {
            const stream = ytdl(url, { quality: 'highestaudio', filter: 'audioonly' });
    
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Transfer-Encoding', 'chunked');
            res.setHeader('Access-Control-Allow-Origin', '*');
    
            stream.on('data', (chunk) => {
              res.write(chunk);
            });
    
            stream.on('error', (error) => {
              console.error(error);
              res.statusCode = 500;
              res.end('Error streaming audio');
            });
    
            stream.on('end', () => {
              res.end();
            });
          } catch (error) {
            console.error(error);
            res.statusCode = 400;
            res.end('Invalid YouTube link');
          }
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});