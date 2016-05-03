var reduce = use("Jason/Reducer/FindOrFail");
var formatter = use("Jason/Formatter/Page");

module.exports = function(request, response, shared) {
    var session = reduce(request.params.sessionId, shared.sessions, response);

    session.instance
        .createPage()
        .then(function(instance) {
            var id = session.pageId++;

            var created = {
                "id": id,
                "instance": instance,
                "returned": null,
                "address": null,
                "status": null,
                "body": null
            };

            session.pages.push(created);

            return response.send({
                "status": "ok",
                "page": formatter(created)
            });
        });
};
