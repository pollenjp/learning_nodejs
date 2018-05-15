// server.js



var http = require("http");     // 変数httpを用いてNode.jsに同梱されているhttpモジュールへのアクセスを可能にする


http.createServer(
    function(request, response)
    {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World!");
        response.end();
    }
).listen(8888);




