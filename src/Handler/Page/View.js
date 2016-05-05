var reduce = use("Undemanding/Reducer/FindOrFail");
var format = use("Undemanding/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (!page.address) {
        return response.send({
            "status": "ok",
            "page": format(page)
        });
    }

    page.instance
        .property("content")
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
