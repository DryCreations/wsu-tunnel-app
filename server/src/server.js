const http = require("http");
const url = require("url");
const database = require("./database.js");
const pathfinder = require("./pathfinder.js");

const server = http.createServer();
server.listen(5000);
server.setTimeout();

server.on("request", async function(request, response) {
  const parsedUrl = parseUrl(request.url);

  if (checkUrlForID(parsedUrl)) {
    const path = await preparePath(parsedUrl);
    response.end(JSON.stringify(path));
  }

  else if (checkUrlForRoom(parsedUrl)) {
    let endNodes = await database.getNodesToRoom(parsedUrl.query.toRoom);
    
    if(endNodes.length > 0) {
      let path = await pathfinder.getPath(+parsedUrl.query.start, endNodes);
      response.end(JSON.stringify(path));
    }
    else {
      response.end(JSON.stringify({"ERROR": "Could not find any paths to room " + parsedUrl.query.toRoom}));
    }
  } 

  else {
    response.end(JSON.stringify({"ERROR": "Poorly formed URL", "REQUESTED URL": request.url}));
  }
});

function checkUrlForID(parsedUrl) {
  return parsedUrl.path.match(/getPath\?start=\d+&end=[\d,]+/);
}

function checkUrlForRoom(parsedUrl) {
  return parsedUrl.path.match(/getPath\?start=\d+&toRoom=[A-Z]{2}%20[A-Z]*[A-Z0-9]\d{2}[A-Z]{0,2}/);
}

function parseUrl(requestUrl) {
  return url.parse(requestUrl, true);
}

async function preparePath(parsedUrl) {
  //Transform the comma separated node IDs into an array
  let endNodes = parsedUrl.query.end.split(',').map(i => +i);
  
  return pathfinder.getPath(+parsedUrl.query.start, endNodes);
}

