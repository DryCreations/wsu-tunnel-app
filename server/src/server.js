const http = require('http');
const url = require('url');
const pathfinder = require('./pathfinder.js');

const server = http.createServer(async function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    if (!parsedUrl.path.match(/getPath\?start=\d+&end=\d+/)) res.end();
    const path = await pathfinder.getPath(+parsedUrl.query.start, +parsedUrl.query.end);
    res.end(JSON.stringify(path));
});

server.listen(5000);
