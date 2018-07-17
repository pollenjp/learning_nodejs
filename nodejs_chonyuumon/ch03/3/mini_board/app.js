//  index.js


const PORT = 3000;

const http = require("http");
const fs   = require("fs");
const ejs  = require("ejs");
const url  = require("url");
const qs   = require("querystring");  // New


var index_page = fs.readFileSync("./index.ejs", "utf8");
var login_page = fs.readFileSync("./login.ejs", "utf8");
var style_css  = fs.readFileSync("./style.css", "utf8");

const max_num = 10;  // 最大保管数
const filename = 'mydata.txt';  // データファイル名
var message_data;
readFromFile(filename);


//--------------------------------------------------------------------------------
//  main
//--------------------------------------------------------------------------------
var server = http.createServer(getFromClient);
server.listen(PORT);
console.log("Server start!");
console.log(PORT + " port is listening...");


//--------------------------------------------------------------------------------
//  createServer
//--------------------------------------------------------------------------------
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

    case "/":  // トップページ（掲示板）
      response_index(req, res);
      break;

    case "/login":  // ログインページ
      response_login(req, res);
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
//  response_login
//--------------------------------------------------------------------------------
function response_login(req, res)
{
  var content = ejs.render( login_page, {} );
  // Response Processing
  res.writeHead( 200, {"Content-Type": 'text/html'} );
  res.write(content);
  res.end();
}


//--------------------------------------------------------------------------------
//  response_index
//--------------------------------------------------------------------------------
function response_index(req, res)
{
  // POST access
  if ( req.method == 'POST' ){
    var body = '';

    // data event
    req.on('data', (data) => {
      body += data;
    });

    // end event
    req.on('end', () => {
      data = qs.parse(body);  // parse ( <xxx name="msg"> --> data={msg: xxx} )
      addToData(data.id, data.msg, filename, req);
      //    - id    : data.id
      //    - msg   : data.msg
      //    - fname : app.js
      //    - req   : req

      write_index(req, res);
    });
  } else {  // Other access
    write_index(req, res);
  }
}


//--------------------------------------------------------------------------------
// write_index
//--------------------------------------------------------------------------------
function write_index(req, res)
{
  var msg = "伝言板を表示いたします";
  // Rendering a HTML page
  var content = ejs.render( index_page,
                            {
                              title    : "Index",
                              content  : msg,
                              data     : message_data,
                              filename : "data_item",
                            } );
  // Response Processing
  res.writeHead( 200, {"Content-Type": 'text/html'} );
  res.write(content);
  res.end();
}


//--------------------------------------------------------------------------------
// readFromFile
//--------------------------------------------------------------------------------
function readFromFile(fname)
{
  fs.readFile( fname, 'utf8', (err, data) => {
    message_data = data.split('\n');
  });
}


//--------------------------------------------------------------------------------
// addToData
//--------------------------------------------------------------------------------
function addToData(id, msg, fname, req)
{
  var obj = { 'id': id, 'msg': msg };
  var obj_str = JSON.stringify( obj );
  console.log( "add data: " + obj_str );
  message_data.unshift( obj_str );
  if ( message_data.lengtth > max_num ) {
    message_data.pop();
  }
  saveToFile(fname);
}


//--------------------------------------------------------------------------------
// saveToFile
//--------------------------------------------------------------------------------
function saveToFile(fname)
{
  var data_str = message_data.join('\n');
  fs.writeFile(fname, data_str, (err) => {
    if ( err ){ throw error; }
  });
}



