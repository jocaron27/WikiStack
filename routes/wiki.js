const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

function createURL(title) {
    if (title) {
        newTitle = title.replace(/\s+/g, "_").replace(/\W/g, "");
        return '/wiki/' + newTitle;
    } else {
        return Math.random().toString(36).substring(2, 7);
    }
}

router.get('/', function (req, res, next) {
    Page.findAll({})
    .then(function (foundPage) {
        res.render('index', {
            pages: foundPage
        });
    })
    .catch(next);
});

router.post('/', function (req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;

    User.findOrCreate({
        where: {
            email: email,
            name: name
        }
    })
    .then(function (values) {
        const user = values[0];
        const page = Page.build({
            title: title,
            content: content,
            status: status,
        });
        return page.save()
            .then((page) => {
                return page.setAuthor(user);
            });
    })
    .then(function (page) {
        res.redirect(page.urlTitle)
    })
    .catch(next);

});

router.get('/add', function (req, res, next) {
    res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        }
    })
    .then(function (foundPage) {

        res.render('wikipage', {
            title: foundPage.title,
            content: foundPage.content,
            url: foundPage.urlTitle
        });
    })
    .catch(next);
    })

module.exports = router;