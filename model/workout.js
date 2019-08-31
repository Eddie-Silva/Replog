let mongoose = require("mongoose");

//SCHEMA SETUP 
let workoutSchema = new mongoose.Schema({
   title: String,
   notes: String,
   date: {type: Date, default: Date.now},

   exercise: [
      {
         type:mongoose.Schema.Types.ObjectId, //Assosiate exercise to workout through exercise 'id'
         ref: "Exercise" //name of the model
      }
   ],

   // author: {
   //    id: {
   //          type: mongoose.Schema.Types.ObjectId,
   //          ref: "User"
   //       },
         
   //    username: String
   // }

});

module.exports = mongoose.model("Workout", workoutSchema); //make a model that uses schema from 'workoutSchema
