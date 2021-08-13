const User = require("../models/user.models.js");
const globel = require("../config/messages.config.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    
     
  // Save Customer in the database
    User.create(new User(req.body), (err, data) => {
      if (err){
        if (err.kind === "Exist") {
          res.status(404).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 404,
            message: `User number already Exist .`
          });
        } else {
          res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Some Error Accoured "
          });
        }
      }else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };



  exports.createfacebook = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
  
    // Create a Customer
    const user = new User({
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        
     });
     
  // Save Customer in the database
    User.createfacebookleads(user, (err, data) => {
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


  exports.findAll = (req, res) => {
    var createddate = (req.body.createddate); 
    User.getAll( createddate, (err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };

  exports.upgradeuser = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(500).send({
        response:null,
              status: globel.statusfalse,
              httpstatus: 500,
        message: "Content can not be empty!"
      });
    }
    User.updateuser( 
      new User(req.body), 
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 404,
              message: `Not found Customer with id .`
            });
          } else {
            res.status(500).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 500,
              message: "Error updating Customer with id "
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };
  
  exports.InsertNominee = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
    User.InsertNomineedata(new User(req.body), (err, data) => {
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