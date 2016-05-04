var reduce = use("Jason/Reducer/FindOrFail");
var format = use("Jason/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (!request.body || !request.body.width || !request.body.height) {
        throw new Error("width/height parameter missing");
    }

    page.instance
        .property("viewportSize", {
            "width": parseInt(request.body.width, 10),
            "height": parseInt(request.body.height, 10)
        })
        .then(function() {
            page.width = request.body.width;
            page.height = request.body.height;

            return response.send({
                "status": "ok",
                "page": format(page)
            });
        });
};
