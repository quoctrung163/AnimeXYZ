const db = require('../../db');

module.exports.index = function (req, res, next) {
    let page = parseInt(req.query.page) || 1; // default 1
    let perPage = 4;

    let start = (page - 1) * perPage;
    let end = page * perPage;
    res.render('index', {
        items: db.get('items').value().slice(start, end)
    });
    next();
};

module.exports.search = function (req, res, next) {
    let q = req.query.q;
    let mathchedItems = db.get('items').value().filter(function (item) {
        return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('index', {
        items: mathchedItems
    });
    next();
}