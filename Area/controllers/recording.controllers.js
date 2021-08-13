const User = require("../models/recording.models.js");
const globel = require("../config/enum.config.js");
exports.findrecording = (req, res) => {
   
    User.getrecording(new User(req.body), (err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };