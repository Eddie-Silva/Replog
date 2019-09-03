let express = require("express");
let router = express.Router({mergeParams: true}); //mergeParams required in order to access :id
var Workout = require("../model/workout");
var Exercise = require("../model/exercise");



//Exercise ROUTES

//NEW exercise route
router.get("/new", function(req, res){
   Workout.findById(req.params.id, function(err, foundWorkout){
      if(err){
         console.log();
         
      } else{
         res.render("exercise/new", {workout: foundWorkout});
      }
   });
});

//exercise CREATE
router.post("/", function(req,res){

   //lookup workout to add exercise too
   Workout.findById(req.params.id, function(err, foundWorkout){
      
      if(err){
         console.log(err);
         res.redirect("/workouts");
      } else {
         //create new exercise
         let newType = req.body.Exercise;
      
         let newExercise = newType;
         Exercise.create(newExercise, function(err, createdExercise){
            if(err){
               console.log(err + "new exercise was not created");
            
            } else {
               //save exercise
               createdExercise.save();

               //connect new Exercise to Workout
               foundWorkout.exercise.push(createdExercise);
               foundWorkout.save();
               res.redirect("/");
            }
         });   
      }
   });
});

//exercise EDIT route
router.get("/:exercise_id/edit", function(req, res){
   Workout.findById(req.params.id, function(err, foundWorkout){
      if(err || !foundWorkout) {
         return res.redirect("back");
      } 
      Exercise.findById(req.params.exercise_id, function(err, foundExercise){
         if(err){
            res.redirect("back")
         } else {
            res.render("exercise/edit", {workout_id: req.params.id, exercise: foundExercise}); //req.params.id is coming from app.js 
         }
      });
   });
});

//exercise UPDATE route
router.put("/:exercise_id", function(req, res){
   Exercise.findByIdAndUpdate(req.params.exercise_id, req.body.exercise, function(err, updatedExercise){
      if(err){
         res.redirect("back")
      } else {
         res.redirect("/workouts");
      }
   });
});

//exercise DESTROY route
router.delete("/:exercise_id", function(req, res){

   //find by id and remove
   Exercise.findByIdAndRemove(req.params.exercise_id, function(err){
      if(err){
         res.redirect("back")
      } else {
         res.redirect("/workouts");
      }
   });
});




module.exports = router;