const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


//module.exports = newmongoose.model('login_signup',Loginschema)
const collection = new mongoose.model('login_signup',Loginschema)
module.exports = collection