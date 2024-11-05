const express = require("express");
// const bcrypt = require("bcrypt");
const User = require("../models/user");
const { hashSync } = require("bcrypt");
const router = express.Router();
const passport = require("passport");

router.post('/signup', async (req, res) => {
    const { username, Email, password } = req.body;
    const hashedPassword = hashSync(password, 10);

    let user = new User({
        username: username,
        email: Email,
        password: hashedPassword
    });

    try {
        await user.save();
        console.log('User created:', user);
        req.session.userId = user._id; 
        console.log('Session after signup:', req.session); 
        res.send({ success: true });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send({ success: false, message: 'User registration failed.' });
    }
});

router.post('/login', 
    passport.authenticate('local', { failureRedirect: true,  failureFlash: true }),

    function(req, res) {
      res.send({success: true});
});
// router.post('/login', (req, res)=>{
//     // const {username, password}=req.body;
//     console.log(req.body);
//     // console.log("login");
//     res.send(req.body);
// })

module.exports = router;
