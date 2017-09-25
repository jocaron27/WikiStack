const express = require('express');
const router = express.Router(); 
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', (req, res, next) => {
    User.findAll({})
    .then(function (foundUser) {
        res.render('users', {
            users: foundUser
        });
    })
    .catch(next);
});

router.get('/:id',(req , res, next) => {
    const id = req.params.id;
    const userLookUp = User.findById(id);

    const pagesLookUp = Page.findAll({
            where: {
                authorId: id
            }
        });
    
    const promiseArr = [userLookUp,pagesLookUp]
    Promise.all(promiseArr)
    .then((values)=>{
        const user = values[0]
        const pages = values[1]
        res.render('single',{pages: pages, user: user})
    })
    .catch(next);
})

module.exports = router;