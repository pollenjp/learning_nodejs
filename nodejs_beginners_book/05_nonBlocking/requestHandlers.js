// requestHandlers.js

var exec = require("child_process").exec;


function start(response)
{
    console.log("Request handler 'start' was called.");

    function sleep(milliSeconds)
    {
        var sleepTime = new Date().getTime();
        while (new Date().getTime() < sleepTime + milliSeconds);
    }

    exec("ls -laF", function(error, stdout, stderr)
        {
            sleep(10000);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(stdout);
            response.end();
        }
    );
}

function upload(response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World!");
    response.end();
}

exports.start = start;
exports.upload = upload;



