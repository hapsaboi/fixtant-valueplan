const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type:{
        type:String,
        default:"admin"
    },
    dob: {type: String},
    code: {type: String},
    register_date: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Users', UserSchema);