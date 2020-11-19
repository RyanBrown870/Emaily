const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');
require('./models/User');                // important these require statements are in this order.
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

// Tell app to use cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,           // amount time cookie stays valid befor needing a new one
        keys: [keys.cookieKey]                      // Pull from config.keys, need an array
    })
)

// Tell app to use the cookie keys
app.use(passport.initialize());
app.use(passport.session());

// Higher order function call as authRoutes is module exported as arrow function. app gets passed as argument
require('./routes/authRoutes')(app);    

const PORT = process.env.PORT || 5000;
app.listen(PORT);
