let express = require("express");
let router = express.Router();
var Workout = require("../model/workout")



//INDEX
router.get("/workouts", function(req, res){

   Workout.find({}, function(err, allWorkouts){ //finds all the data from Workout DB
      if(err){
         console.log(err);
      } else {
         console.log("displaying all workouts");
         res.render("workouts/index", {workouts: allWorkouts}) // takes the data from Workout DB and passes it as 'workouts' object to 'workouts.ejs  
      }
   });
});

//SHOW ROUTE - shows detail info on selected Workout
router.get("/workout/:id", function(req, res){
   
   Workout.findById(req.params.id), (function(err, foundWorkout){ //find workout with provided ID, then show template.
      if(err || !foundWorkout){
         res.redirect("/workouts")
      } else {
         res.render("workouts/show", {workout: foundWorkout});
         }
   });
});

//CREATE route
router.post("/workouts", function(req, res){

   //get data from form and add to campgrunds
   let newTitle = req.body.title; // the data of the field with the name atribute 'name'
   let newDate = req.body.date; // the data of the field with the name atribute 'image'
   let newNotes = req.body.notes;
    //console.log(req.user); --view the user data
    let author = {
      id: req.user._id,
      username: req.user.username
   };
   let newWorkout = {name: newName, image: newImage, description: newDescription, author: author}; //makes a new {} with the propertie = to the var newName and newImage

   Workout.create(newWorkout, function(err, newlyCreated){ //Create new Workout and save to database
      if(err){
         console.log(err);
      } else {
         console.log(newlyCreated);//view new created Workout
         
        res.redirect("/workouts");  //redirect back to workout get page 
      }
   });
});

//NEW route
router.get("/workouts/new", function(req, res){
  
   res.render("workouts/new");
});


//EDIT workout route
router.get("/workout/:id/edit", function(req, res){
   
   Workout.findById(req.params.id, function(err, foundWorkout){
      if(err){
         res.redirect("/workouts");
      } else {
         res.render("workouts/edit", {workout:foundWorkout});
      }
   });
});

//UPDATE Workout route
router.put("/workout/:id", function(req, res){
   req.body.blog.body = req.sanitize(req.body.blog.body); //sanitize body text
   //find and update
   Workout.findByIdAndUpdate(req.params.id, req.body.workout, function(err, updatedWorkout){
      if(err){
         res.redirect("/workouts");
      } else {
         res.redirect("/workouts/" + req.params.id);
      }
   })
});

//DESTROY Workout route
router.delete("/workout/:id", function(req, res){
   Workout.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/workouts")
         console.log("could not delete workout");
         
      } else {
         res.redirect("/workouts")
         console.log("workout deleted");
         
      }
   });
});


module.exports = router;