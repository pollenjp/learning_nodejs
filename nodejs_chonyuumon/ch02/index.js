//  index.js


http = require("http");
fs = require("fs");
var request;
var response;


//----------------------------------------
//  main
//----------------------------------------
var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");


//----------------------------------------
//  createServer
//----------------------------------------
function getFromClient(req, res)
{
  request = res;
  response = res;
  fs.readFile("./index.html", "UTF-8", writeToResponse);
}


//----------------------------------------
//  Run after completion of fs.readFile
//----------------------------------------
function writeToResponse(err, data)
{
  response.writeHead(200,{"Content-Type": "text/html"});
  response.write(data);
  response.end();
}
