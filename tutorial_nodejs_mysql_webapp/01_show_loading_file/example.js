// 01_showLoadingFile/example.js
// ファイルを読み込んで表示

var http = require("http"),
    fs = require("fs");


function startServer()
{
    function onRequest(request, response)
    {
        fs.readFile(    // asynchronous IO
            "index.html",           // path
            function(err, data){    // callback (run after read a file from the path)
                if(err){
                    throw err;
                }
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                response.end(data)
            }
        );
    }

    http.createServer(onRequest).listen(8888);
}


startServer();


