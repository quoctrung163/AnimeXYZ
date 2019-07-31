const db = require('../../db');

module.exports.index = function (req, res, next) {
    res.render('index', {
        items: db.get('items').value()
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