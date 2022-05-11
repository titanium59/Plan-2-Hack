const mongoose = require('mongoose');
const schemaa = mongoose.Schema;

const postSchema = new schemaa({
    Question: String,
    Answer: [String]
})
module.exports = mongoose.model('postdata' , postSchema);