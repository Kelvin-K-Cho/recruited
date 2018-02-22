/*eslint max-len: ["error", { "ignoreComments": true }]*/
/*
Passport is authentication middleware made for Node.js.  It comes pre-packaged with
all necessary authentication methods.  OAuth (the protocol of delegating actual authentication
to a third party ) is provided by Google using GoogleStrategy (version 2.0).
*/

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

//Since MongoDB follows NoSQL, mongoose takes the User model (defined elseware) to enforce structure.
const User = mongoose.model("user");

//passport grabs the specific user id from google once google verifies the user.
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//passport finds the user by id and preserves the user data to be passed on to the state.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//passport does not know which OAuth strategy to use by default.  A new GoogleStrategy
//is created and used here.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
