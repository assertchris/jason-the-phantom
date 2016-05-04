module.exports = function(page) {
    return {
        "id": page.id,
        "returned": page.returned,
        "address": page.address,
        "status": page.status,
        "body": page.body,
        "width": page.width ? parseInt(page.width, 10) : null,
        "height": page.height ? parseInt(page.height, 10) : null,
        "left": page.left ? parseInt(page.left, 10) : null,
        "top": page.top ? parseInt(page.top, 10) : null,
        "zoom": page.zoom ? parseFloat(page.zoom) : null
    };
};
