const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 

function createURL(title) {
    if (title) {
        newTitle = title.replace(/\s+/g, "_").replace(/\W/g,"");
        return '/wiki/' + newTitle;
    } else {
        return Math.random().toString(36).substring(2, 7);
    }
}

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;
    const status = req.body.status;
    var page = Page.build({
        title: title,
        content: content,
        status: status
    })
    page.save();
    res.redirect('/');
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});

module.exports = router;