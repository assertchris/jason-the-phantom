var reduce = use("Undemanding/Reducer/FindOrFail");
var format = use("Undemanding/Formatter/Page");

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

            return page.instance.includeJs(
                "https://code.jquery.com/jquery-3.1.0.min.js"
            );
        })
        .then(function() {
            return response.send({
                "status": "ok",
                "page": format(page)
            });
        });
};
