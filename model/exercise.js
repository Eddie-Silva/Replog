var mongoose = require("mongoose");


var exerciseSchema = new mongoose.Schema({
   type: String,
   weight: String,
   reps: Number,
   // author: {
   //    id: {
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "User",
   //    },
   //    username: String
   // }
});

module.exports = mongoose.model("Exercise", exerciseSchema);