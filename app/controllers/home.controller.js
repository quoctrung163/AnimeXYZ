const db = require('../../db');

module.exports.index = function (req, res, next) {
    let homePage = '';
    let querySearch = '';
    let page = parseInt(req.query.page) || 1; // default 1
    let perPage = 4;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let itemsAll = db.get('items').value();
    let items = itemsAll.slice(start, end);

    let countAllPages = Math.ceil(itemsAll.length / perPage);
    let allPagesShow = [];
    let dotBefore = false;
    let dotAfter = false;
    let pageNext = 0;
    let pagePrev = 0;

    if (page === 1) {
        pagePrev = 1;
        pageNext = 2;
    }

    if (page === countAllPages) {
        pagePrev = countAllPages - 1;
        pageNext = countAllPages;
    }

    if (page > 1 && page < countAllPages) {
        pageNext = page + 1;
        pagePrev = page - 1;
    }

    if (page + 3 <= countAllPages) {
        dotAfter = true;
    }

    if (page === countAllPages - 2) {
        dotAfter = true;
    }

    if (page >= 3) {
        dotBefore = true;
    }

    if (page < countAllPages && page > 1) {
        allPagesShow = [page - 1, page, page + 1];
    }

    if (countAllPages === 2) {
        allPagesShow = [1, 2];
    }

    if (countAllPages === 3) {
        allPagesShow = [1, 2, 3];
    }

    if (page === 1 && page < countAllPages) {

        if (countAllPages >= 3) {
            allPagesShow = [1, 2, 3];
        }
    }

    if (page === countAllPages - 1 && countAllPages > 3) {
        allPagesShow = [page - 1, page, page + 1]
    }

    if (page === countAllPages && countAllPages > 3) {
        allPagesShow = [page - 2, page - 1, page]
    }

    res.render('index', {
        homePage: homePage,
        querySearch: querySearch,
        items: items,
        pageNow: page,
        pagePrev: pagePrev,
        pageNext: pageNext,
        endPage: countAllPages,
        allPagesShow: allPagesShow,
        dotAfter: dotAfter,
        dotBefore: dotBefore
    });
    next();
};

module.exports.search = function (req, res, next) {
    let q = req.query.q;
    let homePage = '/search';
    let querySearch = '&q=' + q;
    let mathchedItems = db.get('items').value().filter(function (item) {
        return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    let page = parseInt(req.query.page) || 1; // default
    let perPage = 4;

    let start = (page - 1) * perPage;
    let end = page * perPage;

    let items = mathchedItems.slice(start, end);

    let countAllPages = Math.ceil(mathchedItems.length / perPage);
    let allPagesShow = [];
    let dotBefore = false;
    let dotAfter = false;
    let pageNext = 0;
    let pagePrev = 0;

    if (page === 1) {
        pagePrev = 1;
        pageNext = 2;
    }

    if (page === countAllPages) {
        pagePrev = countAllPages - 1;
        pageNext = countAllPages;
    }

    if (page > 1 && page < countAllPages) {
        pageNext = page + 1;
        pagePrev = page - 1;
    }

    if (page + 3 <= countAllPages) {
        dotAfter = true;
    }

    if (page === countAllPages - 2) {
        dotAfter = true;
    }

    if (page >= 3) {
        dotBefore = true;
    }

    if (page < countAllPages && page > 1) {
        allPagesShow = [page - 1, page, page + 1];
    }

    if (countAllPages === 2) {
        allPagesShow = [1, 2];
    }

    if (countAllPages === 3) {
        allPagesShow = [1, 2, 3];
    }

    if (page === 1 && page < countAllPages) {

        if (countAllPages >= 3) {
            allPagesShow = [1, 2, 3];
        }
    }

    if (page === countAllPages - 1 && countAllPages > 3) {
        allPagesShow = [page - 1, page, page + 1]
    }

    if (page === countAllPages && countAllPages > 3) {
        allPagesShow = [page - 2, page - 1, page]
    }

    res.render('index', {
        homePage: homePage,
        querySearch: querySearch,
        items: items,
        pageNow: page,
        pagePrev: pagePrev,
        pageNext: pageNext,
        endPage: countAllPages,
        allPagesShow: allPagesShow,
        dotAfter: dotAfter,
        dotBefore: dotBefore
    });
    next();
}