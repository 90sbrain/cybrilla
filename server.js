const express = require("express");
var port = require("./config/variable").port
const app = express();
// var bodyParser = require('body-parser');

// connect to the db
const connection = require('./config/db.config.js')
connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

//enable json parding
app.use(express.json({
    extended: false
}))


//my app routes
app.use('/', require('./urlShortner/redirect'))
app.use('/url', require('./urlShortner/url'))


//start the app 
const PORT = port
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`))