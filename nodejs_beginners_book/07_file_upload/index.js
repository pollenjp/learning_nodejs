// index.js

var server = require("./server");       // server.js module
var router = require("./router");       // router.js module
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


//--------------------
//  server start
//--------------------
server.start(router.route, handle);




