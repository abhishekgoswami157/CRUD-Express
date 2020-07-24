var mongoose = require('mongoose');

 var Schema = mongoose.Schema;

 var userSchema = new Schema({
     name: {
         type: String,
         required: true
        },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: 18
    }
 }, { timestamps: true });

 //"User" name is same as the name in model directory.Model is equivalent to collections in mongodb.
 var User = mongoose.model("User", userSchema);

 module.exports = User;


