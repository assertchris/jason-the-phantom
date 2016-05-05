var reduce = use("Undemanding/Reducer/FindOrFail");
var format = use("Undemanding/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);

    return response.send({
        "status": "ok",
        "pages": session.pages.map(format)
    });
};
