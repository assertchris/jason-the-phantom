var reduce = use("Undemanding/Reducer/FindOrFail");
var format = use("Undemanding/Formatter/Page");

function respond(response, page) {
    return response.send({
        "status": "ok",
        "page": format(page)
    });
}

function restart(request, response, page, interval) {
    var timeout = parseInt(request.body.timeout, 10);

    return setTimeout(function() {
        clearTimeout(interval);
        respond(response, page);
    }, timeout);
}

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);
    var page = reduce(request.params.pageId, session.pages, response);

    if (!request.body || !request.body.frequency || !request.body.timeout) {
        throw new Error("frequency/timeout parameter missing");
    }

    var frequency = parseInt(request.body.frequency, 10);
    var timeout = restart(request, response, page, interval);

    var interval = setInterval(function() {
        if (page.requests.length > 0) {
            clearTimeout(timeout);
            timeout = restart(request, response, page, interval);
        }
    }, frequency);
};
