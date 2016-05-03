var Ioc = require("adonis-fold").Ioc;
Ioc.autoload("Jason", __dirname);

var express = require("express");
var app = express();

var routes = use("Jason/routes");
routes(app);

app.use(function(error, request, response, next) {
    response.send({
        "status": "error",
        "error": error.message
    });
});

var port = process.env.JASON_THE_PHANTOM_PORT || 4321;

app.listen(port, function() {
    console.log("phpunit-ghost server running at http://localhost:" + port);
});
