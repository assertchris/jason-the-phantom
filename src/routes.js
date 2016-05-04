var parser = require("body-parser");

parser = parser.urlencoded({
    "extended": false
});

var handlers = {
    "session": {
        "list": use("Jason/Handler/Session/List"),
        "create": use("Jason/Handler/Session/Create"),
        "view": use("Jason/Handler/Session/View"),
        "close": use("Jason/Handler/Session/Close")
    },
    "page": {
        "list": use("Jason/Handler/Page/List"),
        "create": use("Jason/Handler/Page/Create"),
        "view": use("Jason/Handler/Page/View"),
        "visit": use("Jason/Handler/Page/Visit"),
        "run": use("Jason/Handler/Page/Run"),
        "resize": use("Jason/Handler/Page/Resize"),
        "scroll": use("Jason/Handler/Page/Scroll"),
        "zoom": use("Jason/Handler/Page/Zoom"),
        "capture": use("Jason/Handler/Page/Capture"),
        "wait": use("Jason/Handler/Page/Wait")
    }
};

module.exports = function(app) {
    var shared = {
        "sessions": [],
        "sessionId": 1
    };

    app.get("/", function(request, response) {
        response.send("Everything is ok!");
    });

    app.get("/session", function(request, response) {
        handlers.session.list(request, response, shared);
    });

    app.post("/session", function(request, response) {
        handlers.session.create(request, response, shared);
    });

    app.get("/session/:sessionId", function(request, response) {
        handlers.session.view(request, response, shared);
    });

    app.post("/session/:sessionId/close", function(request, response) {
        handlers.session.close(request, response, shared);
    });

    app.get("/session/:sessionId/page", function(request, response) {
        handlers.page.list(request, response, shared);
    });

    app.post("/session/:sessionId/page", function(request, response) {
        handlers.page.create(request, response, shared);
    });

    app.get("/session/:sessionId/page/:pageId", function(request, response) {
        handlers.page.view(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/visit", parser, function(request, response) {
        handlers.page.visit(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/run", parser, function(request, response) {
        handlers.page.run(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/resize", parser, function(request, response) {
        handlers.page.resize(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/scroll", parser, function(request, response) {
        handlers.page.scroll(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/zoom", parser, function(request, response) {
        handlers.page.zoom(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/capture", function(request, response) {
        handlers.page.capture(request, response, shared);
    });

    app.post("/session/:sessionId/page/:pageId/wait", parser, function(request, response) {
        handlers.page.wait(request, response, shared);
    });
};
