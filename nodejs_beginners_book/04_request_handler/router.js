// router.js


function route(handle, pathname)
{
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function')         // If the pathname has handler
    {
        handle[pathname]();
    } else {                                            // If the pathname has handler no handler
        console.log("No request handler found for " + pathname);
    }
}

exports.route = route;




