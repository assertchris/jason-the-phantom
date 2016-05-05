var fs = require("fs");
var path = require("path");
var reduce = use("Undemanding/Reducer/FindOrFail");
var format = use("Undemanding/Formatter/Page");

function renderPage(response, page) {
    return page.instance
        .renderBase64("PNG")
        .then(function(data) {
            response.send({
                "status": "ok",
                "data": data
            });
        });
}

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (page.width && page.height) {
        return page.instance
            .property("clipRect", {
                "width": page.width,
                "height": page.height,
                "left": 0,
                "top": 0
            })
            .then(function() {
                return renderPage(response, page);
            });
    }

    return renderPage(response, page);
};
