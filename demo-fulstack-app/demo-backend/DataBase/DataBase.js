const mongoose = require("mongoose");
require('dotenv').config();

const databaseLogin = process.env.MONGODB;

if(!databaseLogin) return  console.log("DB login not found!", databaseLogin)

const connectionOptions = {  useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect( databaseLogin, connectionOptions).then( () => { console.log("+ database connected") })
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../Api/models/user.model'),
    isValidId
};


function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}