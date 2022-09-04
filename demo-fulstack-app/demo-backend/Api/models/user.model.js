const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    age: { type: Number, required: true},
})

module.exports = mongoose.model('User', schema);