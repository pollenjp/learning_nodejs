// server.js


var http = require("http");
var url = require("url");       // url module


//--------------------
//  start
//--------------------
function start(route, handle)
{
    function onRequest(request, response)
    {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}


//--------------------
//  exports
//--------------------
exports.start = start;


