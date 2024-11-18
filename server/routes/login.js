const express = require("express");
const User = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");
const router = express.Router();
const passport = require("passport");

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { username, Email, password } = req.body;

    // Hash the password
    const hashedPassword = hashSync(password, 10);
    const existingUser = await User.findOne({ username: username });
    const existingmail=await User.findOne({email: Email});
        if (existingUser) {
            // console.log("username already exists");
            return res.json({ success: false, message: 'Username already exists' });
        }
        if(existingmail){
            // console.log("email already exists");
            return res.json({success: false, message: 'Email already exists'})
        }

    const user = new User({
        username: username,
        email: Email,
        password: hashedPassword,
    });

    try {
        // Save user to the database
        const savedUser = await user.save();
        console.log('User created:', savedUser);

        // Setting session ID
        req.session.userId = savedUser._id;
        console.log('Session after signup:', req.session);

        // Sending user info back without password
        const userData = {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        };
        res.status(201).json({ success: true, user: userData });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ success: false, message: 'User registration failed.' });
    }
});

// Login Route
router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
    async (req, res) => {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid credentials.' });
            }

            // Sending user info back without password
            const userData = {
                _id: user._id,
                username: user.username,
                email: user.email,
            };
            res.status(200).json({ success: true, user: userData });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ success: false, message: 'Login failed.' });
        }
    }
);

router.get('/logout', function (req, res){
    req.session.destroy(function() {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
  });
  
  
module.exports = router;
