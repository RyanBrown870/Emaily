const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');
const bodyParser = require("body-parser");      // this is a middleware, middlewares on the app.use() method
require('./models/User');                // important these require statements are in this order.
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

// All the middlewares:

app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

// Only run inside production (heroku)

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like main.js or main.css file
    // if request matches up with a specific file within build directory, serve the file. If not, move down.
    app.use(express.static('client/build'));

    // Express will serve up the index.html file if it doesn't recognise the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
