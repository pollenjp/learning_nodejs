//  index.js


const PORT = 3000;

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");
const qs   = require("querystring");  // New


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
  var url_parts = url.parse( req.url, true );
  //    urlString <string>
  //    parseQueryString <boolean>
  //           ex) http://example.com/?msg=hello
  //             - true  ==> {'msg':'hello'}
  //             - false ==> 'msg=hello'
  //    ref:
  //     - https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost

  switch(url_parts.pathname){

    case "/":
      response_index(req, res);
      break;

    case "/other":
      response_other(req, res);
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



//--------------------------------------------------------------------------------
//  response_index
//--------------------------------------------------------------------------------
function response_index(req, res)
{
  // data
  var data = {
    'Taro': '09-999-999',
    'Hanako': '080-888-888',
    'Sachiko': '080-888-888',
    'Ichiro': '060-666-666'
  };

  var msg = "これはIndexページです."
  // Rendering a HTML page
  var content = ejs.render( index_page,
                            {
                              title: "Index",
                              content: msg,
                              data: data,
                              filename: 'data_item'
                            } );
  // Response Processing
  res.writeHead( 200, {"Content-Type": 'text/html'} );
  res.write(content);
  res.end();
}


//--------------------------------------------------------------------------------
//  response_other
//--------------------------------------------------------------------------------
function response_other(req, res)
{
  var msg = "これはOtherページです."
  if ( req.method == 'POST' ){
    // Post Access Processing
    var body = '';

    // data Event
    req.on('data', (data) => {
      // ref: https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
      console.log("request.on(1)");
      body += data;  // get post data
    });

    // end Event
    req.on('end', () => {
      console.log("request.on(2)");
      var post_data = qs.parse(body);  // parse post data

      //----------
      // Check Log
      //----------
      // "msg=aaa+bbb", if you fill "aaa bbb" in the form.
      console.log(body);
      console.log(post_data);  // "msg=aaa+bbb", if you fill "aaa bbb" in the form.
      //----------

      // "msg=aaa+bbb", if you fill "aaa bbb" in the form.
      msg += "あなたは,「" + post_data.msg + "」と書きました。";
      // Rendering a HTML page
      var content = ejs.render(
        other_page,
        {
          title: "Other",
          content: msg
        }
      );
      res.writeHead( 200, {'Content-Type': 'text/html'} );
      res.write(content);
      res.end();
    });
  } else {
    // Get Access Processing
    var msg = "ページがありません.";
    // Rendering a HTML page
    var content = ejs.render(
      other_page,
      {
        title: "Other",
        content: msg
      }
    );
    // Response Processing
    res.writeHead( 200, {"Content-Type": 'text/html'} );
    res.write(content);
    res.end();
  }
}


