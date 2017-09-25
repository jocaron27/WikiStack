const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 
//var Promise = require('bluebird');

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
    });
    

    let pageBuilder = function() {
        return page.save();
    }
    pageBuilder()
    .then(function (){
        res.redirect(page.urlTitle)
    })

    // page.save(
    //     return res.redirect(page.urlTitle)
    // )
    // .then()
    
        
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});

module.exports = router;


// const promisifiedSavedPage = function () {
// 	return new Promise(function (resolve, reject) {
// 		});
// };

// promisifiedReadFile('poem-one/stanza-01.txt').then(function(stanza) {
//     console.log(stanza);
//     blue(stanza);
// });