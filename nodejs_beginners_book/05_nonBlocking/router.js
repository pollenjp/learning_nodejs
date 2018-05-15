// router.js


function route(handle, pathname, response)
{
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function')         // If the pathname has handler
    {
        handle[pathname](response);
    } else {                                            // If the pathname has handler no handler
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;




