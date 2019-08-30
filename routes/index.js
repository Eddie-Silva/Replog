let express = require("express");
let router = express.Router();


//ROOT route
router.get("/", function(req, res){
   res.redirect("/workouts")
})

//ADD auth logic


module.exports = router;