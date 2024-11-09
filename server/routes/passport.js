const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
const { compareSync } = require('bcrypt');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: "Incorrect Username" });
            }
            if (!compareSync(password, user.password)) {
                return done(null, false, { message: "Incorrect Password" });
            }
            return done(null, user); // User is valid
        } catch (err) {
            console.error('Error finding user:', err); // Log the error
            return done(err);
        }
    }
));

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
    User.findById(id).then((user)=>{
      done(null, user);
    })
});
