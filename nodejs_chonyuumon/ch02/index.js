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
  fs.readFile(
    "./index.html",
    "UTF-8",
    function(err, data)
    {
      res.writeHead(200,{"Content-Type": "text/html"});
      res.write(data);
      res.end();
    }
  );
}


