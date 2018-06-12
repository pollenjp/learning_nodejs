//  index.js


const http = require("http");
const fs = require("fs");
const ejs = require("ejs");


//----------------------------------------
//  main
//----------------------------------------
var index_page = fs.readFileSync("./index.ejs", "utf8");

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start!");


//----------------------------------------
//  createServer
//----------------------------------------
function getFromClient(req, res)
{
  var content = ejs.render(
    index_page,
    {
      title: "Indexページ",
      content: "これはテンプレートを使ったページです。"
    }
  );
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(content);
  res.end();
}

