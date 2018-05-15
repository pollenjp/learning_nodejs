// server.js



var http = require("http");     // 変数httpを用いてNode.jsに同梱されているhttpモジュールへのアクセスを可能にする


function onRequest(request, response)
{
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World!");
    response.end();
}


http.createServer(onRequest).listen(8888);      // callback -> onRequest




