var reduce = use("Jason/Reducer/FindOrFail");
var format = use("Jason/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (!request.body || !request.body.left || !request.body.top) {
        throw new Error("left/top parameter missing");
    }

    page.instance
        .property("scrollPosition", {
            "left": parseInt(request.body.left, 10),
            "top": parseInt(request.body.top, 10)
        })
        .then(function() {
            page.left = request.body.left;
            page.top = request.body.top;

            return response.send({
                "status": "ok",
                "page": format(page)
            });
        });
};
