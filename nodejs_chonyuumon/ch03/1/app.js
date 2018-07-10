//  index.js


const PORT = 3000;

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");


//----------------------------------------
//  main
//----------------------------------------
var index_page = fs.readFileSync("./index.ejs", "utf8");
var other_page = fs.readFileSync("./other.ejs", "utf8");
var style_css  = fs.readFileSync("./style.css", "utf8");

var server = http.createServer(getFromClient);

server.listen(PORT);
console.log("Server start!");
console.log(PORT + "port listen.");


//----------------------------------------
//  createServer
//----------------------------------------
function getFromClient(req, res)
{
  var url_parts = url.parse(
    req.url,  // urlString <string>
    true  // parseQueryString <boolean>
            // ex) http://example.com/?msg=hello
              // true  ==> {'msg':'hello'}
              // false ==> 'msg=hello'
    // ref:
    //  - https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
  );

  switch(url_parts.pathname){

    case "/":
      var content = "This is Index page."
      // Processing query string
      var query = url_parts.query;
      if (query.msg != undefined){
        var query_obj =
          content += "You send '" + query.msg + "'.";
      }
      // Rendering a HTML page
      var content = ejs.render(
        index_page,
        {
          title: "Index",
          content: content 
        }
      );
      // Response Processing
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
      res.end();
      break;

    case "/other":
      // Rendering a HTML page
      var content = ejs.render(
        other_page,
        {
          title: "Otherページ",
          content: "新しく用意したページです。"
        }
      );
      // Response Processing
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(content);
      res.end();
      break;

    case "/style.css":
      // Response Processing
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(style_css);
      res.end();
      break;

    default:
      // Response Processing
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("No Page...");
      break;
  }
}

