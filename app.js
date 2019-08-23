//SETUP 
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOveride = require("method-override");
const expressSanitizer = require("express-sanitizer");

//APP CONFIG
mongoose.connect("mongodb://localhost/replog", {useNewUrlParser: true, useFindAndModify: false}); //create, name and use mongo database ("use...:bool" added to stop deprecation warnings)
app.set("view engine", "ejs");
app.use(express.static("public")); //use custome stylesheet
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOveride("_method"));

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

//INDEX ROUTE
app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){ //retrieve blogs from database
      if(err){
         console.log(err);
      } else {
         res.render("index", {blogs: blogs})
      }
   })
})

//NEW ROUTE
app.get("/blogs/new", function(req, res){
   res.render("new")
});

//CREAT ROUTE
app.post("/blogs", function(req,res){
   req.body.blog.body = req.sanitize(req.body.blog.body); //sanitize body text
   Blog.create(req.body.blog, function(err, newBlog){ //crete blog
      if(err){
         console.log(err);
         //res.render("new")
      } else {
          res.redirect("/blogs") //redirect
      }
   });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
         res.redirect("/bogs");
      } else {
         res.render("show", {blog: foundBlog});
      }
   });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
         res.redirect("/blogs");
      } else {
         res.render("edit",{blog: foundBlog});
      }
   });
   
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body); //sanitize body text
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
         res.redirect("/blogs");
      } else {
         res.redirect("/blogs/" + req.params.id);
      }
   });
})

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/blogs");
      } else {
         res.redirect("/blogs");
      }
   });
});


//server SETUP
app.listen(3000, function(){
   console.log("app server running");
   
});