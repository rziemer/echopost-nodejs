var http = require('http');

function echoFunction(request, response)
{
    console.log(request.method);
    console.log(request.headers);
    console.log(request.url);

    request.on('error', (err) => 
    {
        console.error(err)
        response.statusCode = 400;
        response.end();
    });

    if (request.method === 'GET' && request.url === '/echo')
    {
        response.statusCode = 200;
        response.write("<!DOCTYPE html>\n")
        response.write("<html>\n");
        response.write("<body>\n");
        response.write("<h1>Welcome to the node.js HTTP Echo Server!</h1>\n");
        response.write("<form action=\"/echo\" method=\"post\">\n");
        response.write("Data to Echo: <input type=\"text\"; name=\"data\"><br>\n");
        response.write("<input type=\"submit\"; value=\"Submit\">\n");
        response.write("</form>\n");
        response.write("</body>\n");
        response.write("</html>\n");
        response.end();
    }

    if (request.method === 'POST' && request.url === '/echo')
    {
        console.log("PASSED");
        request.pipe(response);
    }
    else
    {
        console.log("FAILED");
        console.log(request.method);
        console.log(request.url);
        response.statusCode = 404;
        response.end();
    }
}

var server = http.createServer(echoFunction);
var port = process.env.PORT || 8080;

server.listen(port);
console.log("Server running at http://localhost:%d", port);
