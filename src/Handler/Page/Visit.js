var reduce = use("Jason/Reducer/FindOrFail");
var format = use("Jason/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (!request.body || !request.body.address) {
        throw new Error("address parameter missing");
    }

    page.instance
        .open(request.body.address)
        .then(function(status) {
            page.status = status;

            return page.instance.property("content");
        })
        .then(function(content) {
            page.body = content;

            return page.instance.evaluate(function() {
                return window.location.href;
            });
        })
        .then(function(address) {
            page.address = address;

            return response.send({
                "status": "ok",
                "page": format(page)
            });
        });
};
