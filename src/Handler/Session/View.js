var reduce = use("Undemanding/Reducer/FindOrFail");
var format = use("Undemanding/Formatter/Session");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);

    return response.send({
        "status": "ok",
        "session": format(session)
    });
};
