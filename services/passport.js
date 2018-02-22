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

//passport does not know which OAuth strategy to use by default.  For this app, GoogleStrategy
//is enforced.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //Once Google verifies the user, the callback path is set below.
      callbackURL: "/auth/google/callback",
      //Since this app utilizes two different servers (one for frontend, other for backend),
      //proxy is enabled to avoid crashing the app.
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //If a user is found, return existing user.
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          //Otherwise, generate a new user and pull the following information from google profile.
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
