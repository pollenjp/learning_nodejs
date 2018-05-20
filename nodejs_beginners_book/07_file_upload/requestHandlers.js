// requestHandlers.js

var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

//--------------------
//  start()
//  upload()
//--------------------
function start(response)
{
    console.log("Request handler 'start' was called.");


    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action "/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request)
{
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(
        request,
        function(erro, field, files){
            console.log("parsing done");
            fs.rename(
                files.upload.path,
                "/tmp/test.jpg",
                function(err){
                    if(err){
                        fs.unlink("/tmp/test.jpg");
                        fs.rename(files.upload.path, "/tmp/test.jpg");
                    }
                }
            );

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("recieved image:<br>");
            response.write("<img src='/show'>");

            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("You've sent: " + querystring.parse(postData).text);
            response.end();
        }
    );
}


function show(response, postData)
{
    console.log("Request handler 'show' was called");
    fs.readFile(
        "/home/pollen/Pictures/Screenshot from 2018-05-18 14-19-09.png",    // path
        "binary",                                                           // encoding, option
        function(error, file){                                              // callback
            if (error){
                response.writeHead(
                    500,                             // statusCode
                    {"Content-Type": "image/jpg"}    // headers
                );
                response.write(error + "\n");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type": "image/jpg"});
                response.write(file, "binary");     // chunk[, encoding]
                response.end();
            }
        }
    );
}

//--------------------
//  exports
//--------------------
exports.start = start;
exports.upload = upload;
exports.show = show; 


