const http = require('http');
const querystring = require('querystring');
const url = require('url');
const pathfinder = require('./pathfinder.js');

const server = http.createServer(async function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/getPath' && parsedUrl.query.start && parsedUrl.query.end) {
        const path = await pathfinder.getPath(+parsedUrl.query.start, +parsedUrl.query.end);
        res.end(JSON.stringify(path));
    } else {
        res.end();
    }
});

server.listen(5000);
