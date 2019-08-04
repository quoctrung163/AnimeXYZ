const db = require('../../db');
const shortid = require('shortid');
const md5 = require('md5');

module.exports.index = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers
    });
}

module.exports.create = function (req, res) {
    res.render('users/create');
};


module.exports.get = function (req, res) {
    let id = req.params.id;

    let page = parseInt(req.query.page) || 1; // default 1
    let perPage = 8;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let itemsAll = db.get("items").value();
    let items = itemsAll.slice(start, end);

    let user = db.get('users').find({
        id: id
    }).value();

    let sessionId = req.signedCookies.sessionId;
    let allFavorite = db.get('sessions').find({
        id: sessionId
    }).get('cart').value();

    let arrItem = [];

    for (var item in allFavorite) {
        for (var x of itemsAll) {
            if (x.id === item) {
                arrItem.push({
                    "name": x.name,
                    "count": arrItem[item]
                })
            }
        }
    }

    res.render('users/view', {
        user: user,
        items: items,
        arrItem: arrItem
    });
};

module.exports.postCreate = function (req, res, next) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');
    req.body.password = md5(req.body.password);

    db.get('users').push(req.body).write();
    res.redirect('/users');
};