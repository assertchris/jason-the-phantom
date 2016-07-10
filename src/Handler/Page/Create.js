var reduce = use("Undemanding/Reducer/FindOrFail");
var formatter = use("Undemanding/Formatter/Page");

function filter(requests, url) {
    return requests.filter(function(request) {
        return request !== url;
    })
}

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
                "body": null,
                "width": null,
                "height": null,
                "left": null,
                "top": null,
                "factor": null,
                "requests": []
            };

            instance.on("onResourceRequested", function(data) {
                created.requests.push(data.url);
            });

            instance.on("onResourceReceived", function(data) {
                created.requests = filter(created.requests, data.url);
            });

            instance.on("onResourceError", function(data) {
                created.requests = filter(created.requests, data.url);
            });

            instance.on("onResourceTimeout", function(data) {
                created.requests = filter(created.requests, data.url);
            });

            session.pages.push(created);

            instance
                .includeJs("https://code.jquery.com/jquery-3.1.0.min.js")
                .then(function() {
                    return response.send({
                        "status": "ok",
                        "page": formatter(created)
                    });
                });
        });
};
