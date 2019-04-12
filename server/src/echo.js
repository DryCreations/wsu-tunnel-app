const http = require("http");

const server = http.createServer();
server.listen(5000);

server.on("request", async function(request, response) {
    if (request.method === "POST" && request.url === "/echo") {
        let body = "";
        request.on("data", function(chunk) {
            body += chunk;
        });
        request.on("end", function() {
            console.log(body);
            response.end(body);
        });
    };
});
