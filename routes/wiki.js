const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/', function(req, res, next) {
    res.render('index');
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});

module.exports = router;