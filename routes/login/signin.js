const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../../models/users');

router.get('/', async function(req, res, next) {
    const userName = req.query.user_name;
    const password = req.query.password;
    const user = await userModel.findOne({ user_name: userName, password: password});

    if(user){
        res.send(user);
    } else {
        next();
    }
    
});

module.exports = router;