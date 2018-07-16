//  index.js


const PORT = 3000;

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");
const qs   = require("querystring");  // New


//--------------------------------------------------------------------------------
// data
//--------------------------------------------------------------------------------
var data = { msg: 'no message...' };
var data2 = {
  'Taro'   : ['taro@yamada',   '09-999-999',  'Tokyo'],
  'Hanako' : ['hanako@flower', '080-888-888', 'Yokohama'],
  'Sachiko': ['sachi@happy',   '080-888-888', 'Nagoya'],
  'Ichiro' : ['Ichiro',        '060-666-666', 'USA'],
}


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
  if ( req.method == 'POST' ){
    var body = '';

    // data event
    req.on('data', (data) => {
      body += data;
    });

    // end event
    req.on('end', () => {
      data = qs.parse(body);  // parse ( <xxx name="msg"> --> data={msg: xxx} )
      setCookie('msg', data.msg, res);  // Save Cookie
      write_index(req, res);
    });
  } else {
    write_index(req, res);
  }
}


//--------------------------------------------------------------------------------
// write_index
//--------------------------------------------------------------------------------
function write_index(req, res)
{
  var msg = "伝言板を表示いたします";
  var cookie_data = getCookie('msg', req);  // (key, req)
  // Rendering a HTML page
  var content = ejs.render( index_page,
                            {
                              title       : "Index",
                              content     : msg,
                              data        : data,
                              cookie_data : cookie_data,
                            } );
  // Response Processing
  res.writeHead( 200, {"Content-Type": 'text/html'} );
  res.write(content);
  res.end();
}


//--------------------------------------------------------------------------------
// setCookie
//--------------------------------------------------------------------------------
//  - set cookie value
function setCookie(key, value, res)
{
  var cookie = escape(value);
  res.setHeader('Set-Cookie', [key + '=' + cookie]);
}


//--------------------------------------------------------------------------------
// getCookie
//--------------------------------------------------------------------------------
//  - get cookie value
function getCookie(key, req)
{
  var cookie_data = req.headers.cookie != undefined ? req.headers.cookie : '';
  var data = cookie_data.split(';');  // split cookie data
  for (var i in data){
    if ( data[i].trim().startsWith( key + '=' )) {
      // The trim() method removes whitespace from both ends of a string.
      var result = data[i].trim().substring( key.length + 1 );
      return unescape(result);
    }
  }
  return '';
}


//--------------------------------------------------------------------------------
//  response_other
//--------------------------------------------------------------------------------
function response_other(req, res)
{
  var msg = "これはOtherページです."

  // Rendering a HTML page
  var content = ejs.render( other_page,
                            {
                              title: "Other",
                              content: msg,
                              data: data2,
                              filename: 'data_item',
                            } );
  // Response Processing
  res.writeHead( 200, {"Content-Type": 'text/html'} );
  res.write(content);
  res.end();
}



