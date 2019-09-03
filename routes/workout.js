let express = require("express");
let router = express.Router();
var Workout = require("../model/workout")



//INDEX
router.get("/", function(req, res){

   Workout.find({}).sort({ date:1 }).populate("exercise").exec(function(err, allWorkouts){ //finds all the data from Workout DB
      if(err){
         console.log(err);
      } else {
         res.render("workouts/index", {workouts: allWorkouts}) // takes the data from Workout DB and passes it as 'workouts' object to 'workouts.ejs  
      }
   });
});

//NEW route
router.get("/new", function(req, res){
  
   res.render("workouts/new");
});


//CREATE route
router.post("/", function(req, res){

   
   let newRoutine = req.body.routine; // get the "routine object from form"
   

   //console.log(req.user); --view the user data
   //  let author = {
   //    id: req.user._id,
   //    username: req.user.username
   // };

   //let newWorkout = newRoutine; //makes a new {} with the propertie = to the var newTitle...

   Workout.create(newRoutine, function(err, newlyCreated){ //Create new Workout and save to database
      if(err){
         console.log(err);
      } else {
        res.redirect("/workouts");  //redirect back to /workout get route
      }
   });
});




//EDIT workout route
router.get("/:id/edit", function(req, res){
   
   Workout.findById(req.params.id, function(err, foundWorkout){
      if(err){
         res.redirect("/workouts");
      } else {
         res.render("workouts/edit", {workout:foundWorkout});
      }
   });
});

//UPDATE Workout route
router.put("/:id", function(req, res){
   req.body.workout.notes = req.sanitize(req.body.workout.notes); //sanitize body text
   //find and update
   Workout.findByIdAndUpdate(req.params.id, req.body.workout, function(err, updatedWorkout){
      if(err){
         res.redirect("/workouts");
      } else {
         res.redirect("/workouts");
      }
   })
});

//DESTROY Workout route
router.delete("/:id", function(req, res){
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