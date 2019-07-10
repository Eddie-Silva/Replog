//SETUP 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//APP CONFIG
mongoose.connect("mongodb://localhost/replog", {useNewUrlParser: true}); //create, name and use mongo database
app.set("view engine", "ejs");
app.use(express.static("public")); //use custome stylesheet
app.use(bodyParser.urlencoded({extended: true}));


//MONGOOSE/MODEL CONFIG
let blogSchema = new mongoose.Schema({
   title: String,
   body: String,
   image: String, //to have a default string use= {type: String, default: "placehoderimage.jpg"} 
   created: {type: Date, default: Date.now}
});

//POPULATE DATABASE
let Blog = mongoose.model("Blog", blogSchema)


//RESTFUL ROUTES

app.get("/", function(req, res){
   res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){ //retrieve blogs from database
      if(err){
         console.log(err);
      } else {
         res.render("index", {blogs: blogs})
      }
   })
})

app.listen(3000, function(){
   console.log("app server running");
   
})