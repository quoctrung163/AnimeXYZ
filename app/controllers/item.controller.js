var db = require('../../db');

module.exports.addToCart = function (req, res, next) {
    var itemAnimeId = req.params.itemAnimeId;
    var sessionId = req.signedCookies.sessionId;

    res.cookie('itemAnimeId', itemAnimeId, {
        signed: true
    });

    if (!sessionId) {
        res.redirect('/');
        return;
    }

    var count = db
        .get('sessions')
        .find({
            id: sessionId
        })
        .get('cart.' + itemAnimeId, 0)
        .value();

    db.get('sessions')
        .find({
            id: sessionId
        })
        .set('cart.' + itemAnimeId, count + 1)
        .write();

    res.redirect('/');
    next();
};