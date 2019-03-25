const http = require('http');
const querystring = require('querystring');
const pathfinder = require('./pathfinder.js');

const server = http.createServer(async function (req, res) {
    const query = querystring.parse(req.url.replace(/^\/[a-zA-Z0-9]*\?/,''));
    res.end(JSON.stringify(await pathfinder.getPath(+query.start, +query.end)));
});

server.listen(5000);
