const Userlogin = require("../models/userlogin.models.js");
const globel = require("../config/enum.config.js");
exports.activitylog = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      response:null,
      status: globel.statusfalse,
      httpstatus: 404,
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const userlogin = new Userlogin({
    Statusid: req.body.Statusid,
    Userid: req.body.Userid,
    Activityid: req.body.Activityid,
    
    
  });
// Save Customer in the database
Userlogin.createactivitylog(userlogin, (err, data) => {
    if (err)
      res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 404,
        message:
          err.message || "Some error occurred while creating the Activitylog."
      });
    else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
  });
};


//For login
exports.findOne = (req, res) => {
  var phone=  JSON.stringify(req.body.phone);
  var password = JSON.stringify(req.body.password);
    Userlogin.findById(phone , password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 404,
            message: `Not found User with id ${phone}.`
          });
        } else {
          res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Error retrieving User with id " + phone
          });
        }
      } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };

  exports.findactivitylog = (req, res) => {
    Userlogin.getAll((err, data) => {
      if (err)
        res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving Activitylog."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };