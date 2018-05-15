// index.js

var server = require("./server");       // server.js module
var router = require("./router");       // router.js module

server.start(router.route);



