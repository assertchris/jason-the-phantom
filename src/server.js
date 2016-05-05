var Ioc = require("adonis-fold").Ioc;
Ioc.autoload("Undemanding", __dirname);

var express = require("express");
var app = express();

var routes = use("Undemanding/routes");
routes(app);

app.use(function(error, request, response, next) {
    response.send({
        "status": "error",
        "error": error.message
    });
});

var host = process.env.UNDEMANDING_SERVER_HOST || "localhost";
var port = process.env.UNDEMANDING_SERVER_PORT || 4321;

app.listen(port, host, function() {
    console.log("server running at http://" + host + ":" + port);
});
