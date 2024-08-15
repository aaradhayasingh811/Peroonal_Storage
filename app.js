const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const userSchema = require('./model/user');
const dataSchema = require('./model/data');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('./config/mongoose-connection'); 
const { log } = require('console');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const data = require('./model/data');
const ObjectId = require('mongodb').ObjectId;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Call cookieParser as a function
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/signup', (req, res) => {
    res.render('create', { error: req.query.error });
});


app.post('/createuser',async(req,res)=>{
    // Defining function for unique user check
    const {username, password,email,name} = req.body;
    const existingUser = await userSchema.findOne({ username });

        if (existingUser) {
            // Redirect back with an error message if username is taken
            return res.redirect('/signup?error=username_exists');
        }

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt,async function(err, hash) {
            // Store hash in your password DB.

            let user =await userSchema.create({
                username,name,email,
                password : hash
            })
            // console.log(user);
            let token = jwt.sign({ email: email, username : username }, 'shhhhh');

            res.cookie("token",token);
            res.redirect('/');
        });
    });



});

// Route to render the edit form
app.get('/edit/:idname', async (req, res) => {
    try {
        const user = await dataSchema.findById(req.params.idname);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render("edit", { data: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Server error');
    }
});

// Route to handle form submission for updating a user
app.post('/update/:idname', async (req, res) => {
    try {
        const updatedUser = await dataSchema.findByIdAndUpdate(
            req.params.idname,
            {
                title: req.body.title,
                message: req.body.message,
                image: req.body.image,
                username: req.body.username,
            },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        const redirectUrl = `/work/${encodeURIComponent(req.body.username)}`;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
});


app.get('/addData/:username',async (req,res)=>{
    const { username } = req.params;

    const finduser = await userSchema.findOne({ username });
    let token = jwt.sign({ username : username }, 'shhhhh');
    res.cookie("token",token);
    res.render('main', { name: finduser });
   
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const finduser = await userSchema.findOne({ username });
        
        if (finduser) {
            const result = await bcrypt.compare(password, finduser.password);
            
            if (result) {
                let token = jwt.sign({ username : username }, 'shhhhh');
                res.cookie("token",token);
                res.render('main', { name: finduser });


            } else {
                res.render('error');
            }
        } else {
            res.render('error');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect('/');

})

app.get('/work/:username', async (req, res) => {
    const { username } = req.params;
    
    try {
       
        let data = await dataSchema.find({username});
        // console.log(data);
        if(data.length==0){
            res.send("No data to show");
        }
        else{
            res.render('storage',{data:data});

        }
        
    } catch (error) {
        console.error('Error adding data:', error);
    }
});

app.get('/delete/:idname/:username', async(req,res)=>{
    console.log(req.params.idname);
    const user =await dataSchema.findOneAndDelete({_id:new ObjectId(req.params.idname)});
    const { username } = req.params;
    // console.log(user);
    const redirectUrl = `/work/${encodeURIComponent(username)}`;
    // console.log(redirectUrl);
    res.redirect(redirectUrl);

})



app.post('/work/:username', async (req, res) => {
    const { title, message, image } = req.body;
    const { username } = req.params;
    
    try {
        const addData = await dataSchema.create({
            title,
            message,
            image,
            username
        });
        
        // console.log(addData);
        let data = await dataSchema.find({username});
        // console.log(data);
        
        res.render('storage',{data:data});
        // res.redirect('/'); // Redirect to home or another page after creating data
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
