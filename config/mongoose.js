//require the library
const mongoose = require('mongoose');

//connect to Database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,'error connecting to db'));

//up and running the print message
db.once('open', function () {
    console.log("Succesfully Connected to Database.");

});