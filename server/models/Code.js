const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        default:"available"
    },
    type:{
        type:String,
        required: true,
    },
    user: {
        type: String,
    }
});


module.exports = mongoose.model('Codes', CodeSchema);