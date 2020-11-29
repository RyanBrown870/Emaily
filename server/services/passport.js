const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

// Turns mongo model instance into an id which we use as a cookie token so don't need to repeat OAuth as already verified.
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is the id from Mongo record (not the googleId). Better if have multiple authentication sources (FB, apple etc)
});

// Turns id (cookie token) back into a model instance for Mongo.
passport.deserializeUser((id, done) => {
  // Need to search DB for a record with this id:
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Set up passport with client id etc and callback url we will be sent back to.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", // This can be whatever you want (doesn't need to be auth etc)
      proxy: true, // Need this as auth won't let heroku proxy through unless enabled
    },
    async (accessToken, refreshToken, profile, done) => {
      // Callback function as second argument. This fires after second route handler get's access token from google
      
      const existingUser = await User.findOne({ googleId: profile.id }); // Check if collection has any matching records (any googleId's maching this new profile.id)

      if (existingUser) {
        // We have an existing record:
        done(null, existingUser); // done is passport function which is argument to the callback above. 1st argument is null as we have record, second we pass it that user record.
      } else {
        // No existing record of user, create new one:
        const user = await new User({ googleId: profile.id }).save(); // this returns promise as well. Svae the record, then:
          done(null, user); // calls done() with the new user.
      }
    }
  )
);
