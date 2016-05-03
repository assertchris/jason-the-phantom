module.exports = function(page) {
    return {
        "id": page.id,
        "returned": page.returned,
        "address": page.address,
        "status": page.status,
        "body": page.body
    };
};
