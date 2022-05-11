const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String
})
module.exports = mongoose.model('userdata' , userSchema)