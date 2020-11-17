const express = require("express");
const passportConfig = require('./services/passport')

const app = express();

// Higher order function call as authRoutes is module exported as arrow function. app gets passed as argument
require('./routes/authRoutes')(app);    

const PORT = process.env.PORT || 5000;
app.listen(PORT);
