const mongoose = require("mongoose");
const schema = mongoose.Schema({
    "url": String,
    "title":String,
    "time": Number,
},
    {
        "versionKey": false
    });
module.exports = mongoose.model('schema', schema);//1 = collection