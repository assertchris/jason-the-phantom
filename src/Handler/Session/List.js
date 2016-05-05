var formatter = use("Undemanding/Formatter/Session");

module.exports = function(request, response, shared) {
    return response.send({
        "status": "ok",
        "sessions": shared.sessions.map(formatter)
    });
};
