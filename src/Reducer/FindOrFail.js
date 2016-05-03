module.exports = function(id, items, response) {
    var items = items.filter(function(item) {
        return item.id == id;
    });

    if (!items.length) {
        throw new Error("not found");
    }

    return items[0];
};
