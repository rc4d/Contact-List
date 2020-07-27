const express= require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');



// can you open the folder in which this contact list 

const app= express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware 1
// app.use(function (req, res, next) {
//     req.myName="Robin";
//     // console.log("Middleware 1 is called.");
//      next();
    
// })
// //middleware 2
// app.use(function (req, res, next) {
//     console.log("My name from mw2", req.myName);
//    //console.log("Middleware 2 is called.");
//     next();

// })
var contactList = [
    {
        name:"Robin",
        phone:"75830953290"
    },

    {
        name:"Arpan",
        phone:"987554676"
    },
    {
        name:"Coding Ninja",
        phone:"763840986"
    }
]

 


app.get('/', function (req, res) {
//   console.log("From the get route crontller",req.myName);
//Contact.find({name:'new'}, function (err, contacts)
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title:"Contacts List",
            contact_list: contacts
        });
    });
   
});


app.post('/create-contact', function (req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone,
    // });
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*****', newContact);
        return res.redirect('back');
    });
    // contactList.push(req.body);
//    return res.redirect('back');
});  

app.get('/delete-contact', function (req, res) {
   //het the id from query in the ul
    let id = req.query.id;
    
    Contact.findByIdAndDelete(id, function (err) {
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    
});
 
app.listen(port, function (err) {
    if(err){
        console.log("Error in running server", err);}
        console.log("Yup my express server is running on Port:",port);

    
});
// its done

//https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client