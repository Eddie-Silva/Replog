let mongoose = require("mongoose");

//SCHEMA SETUP 
let workoutSchema = new mongoose.Schema({
   title: String,
   date: {type: Date, default: Date.now},
   notes: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   exercises: [
      {
         type:mongoose.Schema.Types.ObjectId, //Assosiate exercise to workout through exercise 'id'
         ref: "Exercise" //name of the model
      }
   ]
});

module.exports = mongoose.model("Workout", workoutSchema); //make a model that uses schema from 'workoutSchema
