var phantom = require("phantom");
var formatter = use("Jason/Formatter/Session");

module.exports = function(request, response, shared) {
    phantom
        .create()
        .then(function(phantom) {
            var id = shared.sessionId++;

            var created = {
                "id": id,
                "instance": phantom,
                "pages": [],
                "pageId": 1
            };

            shared.sessions.push(created);

            return response.send({
                "status": "ok",
                "session": formatter(created)
            });
        });
};
