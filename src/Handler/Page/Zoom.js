var reduce = use("Jason/Reducer/FindOrFail");
var format = use("Jason/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (!request.body || !request.body.zoom) {
        throw new Error("zoom parameter missing");
    }

    page.instance
        .property("zoomFactor", request.body.zoom)
        .then(function() {
            page.zoom = request.body.zoom;

            return response.send({
                "status": "ok",
                "page": format(page)
            });
        });
};
