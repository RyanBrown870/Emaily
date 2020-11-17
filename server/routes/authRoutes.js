const passport = require("passport");

module.exports = (app) => {
  // First route handler to get the code from google for that user
  app.get(
    "/auth/google", // Callback address that google sends us back to after oauth
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // Second route handler to exchange code from url (after auth/google/callback) to get user info
  app.get("/auth/google/callback", passport.authenticate("google"));
};
