//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); 
mongoose.connect("mongodb://localhost:27017/udamyDB", {
  useNewUrlParser: true,
}); 

const userSchema = mongoose.Schema({
    email:String,
    password:String
})
const user = mongoose.model('user',userSchema)

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post('/register',function(req,res){
    console.log(req.body);
    console.log(req.body.password);
    try {
        const userDetails = new user({
            email:req.body.username,
            password:req.body.password 
        })
    
        const newUser = userDetails.save()
        console.log(req.body.username);
        Promise.all([newUser]).then(([newUser])=>{
            console.log(newUser);
            res.render('secrets')         
        })    
    } catch (error) {
        console.log(error.message);
        res.json({
            message:error.message
        })  
    }
    
})


let port = 4000;
app.listen(port, function () {
  console.log(`server running at port ${port}`);
});
