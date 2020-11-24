const mongoose = require('mongoose');
// Destructuring mongoose as has Schema property
const { Schema } = mongoose;

const userSchema = new Schema ({
    googleId: String,                           // specify the type we expect
    credits: { type: Number , default: 0 }      // specify type and default value of 0
});

// Creates our Model Class. This loads it into mongoose so don't need to require it in in other files
mongoose.model('users', userSchema);  // tells mongoose to match up users collection with this Schema. 