var reduce = use("Undemanding/Reducer/FindOrFail");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);

    for (var i = 0; i < session.pages.length; i++) {
        session.pages[i].instance.close();
    }

    shared.sessions = shared.sessions.filter(function(session) {
        return session.id != request.params.sessionId;
    });

    return response.send({
        "status": "ok"
    });
};
