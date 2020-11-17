const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

// Set up passport with client id etc and callback url we will be sent back to.
passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback", // This can be whatever you want (doesn't need to be auth etc)
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);       // Callback function as second argument. This fires after second route handler get's access token from google
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
      }
    )
  );
  