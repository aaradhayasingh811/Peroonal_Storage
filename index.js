const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userSchema = require('./model/user');
const dataSchema = require('./model/data');
const bcrypt = require('bcrypt');
const { assert, log } = require('console');
const { title } = require('process');
const saltRounds = 10;
const db = require('./config/mongoose-connection');
var bodyParser = require('body-parser')




// const mongoose = require('mongoose')
// require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Call cookieParser as a function
app.use(express.static(path.join(__dirname, 'public')));

// const url = process.env.MONGO_URL;
// mongoose.connect(
//     process.env.MONGO_URI,
//     { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
//     () => console.log("Database connected")
//   );
  
// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('create');
});


app.post('/createuser',(req,res)=>{
    const {username, password,email,name} = req.body;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            // Store hash in your password DB.
            let user =await userSchema.create({
                username,name,email,
                password : hash
            })
            console.log(user);
        });
    });



});

app.post('/login',async (req,res)=>{
    const {username, password} = req.body;
    let finduser=await userSchema.findOne({username:username});
    console.log(finduser);
    
    if(finduser){
        bcrypt.compare(password, finduser.password, function(err, result) {
            // result == true
            if(result){
                res.render('main',{name: finduser});
            }
            else{
                res.render('error');
            }
        });
    }
    else{
        res.render('error');
    }

});
app.get('/work/:username',(res,req) => {
    // const {title,message,image} = req.body;
    // console.log(req.body.title);
    // console.log(req.body.message);
    // console.log(req.body.image);
    // console.log(req.params.username);
    
    let addData  =  dataSchema.create({
        title,message, image, username :req.params.username
    });
    console.log(addData);
    res.render('home');

})

app.post('/work/:username',(res,req) => {
    const {title,message,image} = req.body;
    // console.log(req.body.title);
    // console.log(req.body.message);
    // console.log(req.body.image);
    // console.log(req.params.username);
    
    let addData  =  dataSchema.create({
        title,message, image, username :req.params.username
    });
    console.log(addData);
    res.render('home');

})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
});
