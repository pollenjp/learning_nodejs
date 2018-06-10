//  index.js


http = require("http");
fs = require("fs");


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
  fs.readFile("./index.html", "UTF-8", 
    function writeToResponse(err, data)
    {
      var content = data.
        replace(/dummy_title/g, "タイトルです").
        replace(/dummy_content/g, "これがコンテンツです");
      res.writeHead(200,{"Content-Type": "text/html"});
      res.write(content);
      res.end();
    }
  );
}


//----------------------------------------
//  Run after completion of fs.readFile
//----------------------------------------

