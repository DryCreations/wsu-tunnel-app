const http = require('http');
const url = require('url');
const pathfinder = require('./pathfinder.js');

const server = http.createServer();
server.listen(5000);
server.setTimeout();

server.on('request', async function(request, response) {
    const parsedUrl = parseUrl(request.url);
    if (checkUrl(parsedUrl)) {
        const path = await preparePath(parsedUrl);
        response.end(JSON.stringify(path));
    }
});

function checkUrl(parsedUrl) {
    return parsedUrl.path.match(/getPath\?start=\d+&end=\d+/);
}

function parseUrl(requestUrl) {
    return url.parse(requestUrl, true);
}

async function preparePath(parsedUrl) {
    return pathfinder.getPath(+parsedUrl.query.start, +parsedUrl.query.end);
}
