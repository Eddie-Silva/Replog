var mongoose = require("mongoose");


var exerciseSchema = new mongoose.Schema({
   exerciseName: String,
   created: {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      username: String
   }
});

module.exports = mongoose.model("Exercise", exerciseSchema);