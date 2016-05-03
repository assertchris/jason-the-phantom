var reduce = use("Jason/Reducer/FindOrFail");
var format = use("Jason/Formatter/page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);

    return response.send({
        "status": "ok",
        "pages": session.pages.map(format)
    });
};
