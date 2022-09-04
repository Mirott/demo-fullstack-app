const express = require("express")
const cors = require("cors")
const bodyParser = require('body-parser');
require('dotenv').config();


const port = process.env.PORT || 3000;

if(!port) return console.log("Port is undefined: "+port);

const app = express();


app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({limit: '15mb', extended: true}));


// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


// start server
app.listen(port, () => {
    console.log('+ server listening on port ' + port);
});


// api routes
app.use('/user', require('./Api/routes/user.router'))

