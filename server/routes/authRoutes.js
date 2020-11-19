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

  // Logout route handler
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user)
  });

  // Test our cookies with another route handlers:
  //Called when request goes through this route. 
  // arrow function gets called when go through this route. req = incoming request obj. res = outgoing response obj
    app.get("/api/current_user", (req, res) => {
      res.send(req.user);                           // immediate response to send req.user
    })

};
