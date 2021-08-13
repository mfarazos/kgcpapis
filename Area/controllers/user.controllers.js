const User = require("../models/user.models.js");
const globel = require("../config/enum.config.js");
// Create and Save a new Customer
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
  // const user = new User({
  //   UserName: req.body.UserName,
  //   Email: req.body.Email,
  //   Phone: req.body.Phone,
  //   CNIC: req.body.CNIC,
  //   Roleid: req.body.Roleid,
  //   Statusid: req.body.Statusid,
    
  // });
// Save Customer in the database
  User.create(new User (req.body), (err, data) => {
    if (err){
      if (err.kind === "Email_Exist") {
        res.status(200).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 500,
              message: 'Active Phone Number Already Exist'
        });
      }else{
            res.status(500).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 500,
              message:
                err.message || "Some error occurred while creating the User."
            });
          }
      
    }else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
  });
};



exports.creater = (req, res) => {
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
    // const userl = new User({
    //     UserName: req.body.UserName,
    //     Statusid: req.body.Statusid,
    //     Userid: req.body.Userid,
    //     Password: req.body.Password
    //   });
  // Save Customer in the database
    User.creater(new User (req.body), (err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };




exports.findAll = (req, res) => {
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving User."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };

exports.findStatus = (req, res) => {
    User.getStatus((err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving User."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };
  
  exports.findVersion = (req, res) => {
    User.getVersion((err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving User."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };

exports.findRole = (req, res) => {
    User.getRoles((err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving User."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };
  
  exports.gettingrecord = (req, res) => {
    User.getRecord((err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving User."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };


  // Update a Customer identified by the customerId in the request
exports.updateduser = (req, res) => {
   var Userid = JSON.stringify(req.body.Userid);
  // Validate Request
   if (!req.body) {
     res.status(400).send({
      response:null,
      status: globel.statusfalse,
      httpstatus: 400,
       message: "Content can not be empty!"
     });
   }

  // console.log(req.body);

  User.UPDATE(
    req.body.Userid,
    new User (req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${Userid}.`
          });
        } else {
          res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Error updating User with id " + Userid
          });
        }
      } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    }
  );
};


exports.insertrecord = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      response:null,
          status: globel.statusfalse,
          httpstatus: 400,
      message: "Content can not be empty!"
    });
  }

  
  User.Record(new User (req.body), (err, data) => {
    if (err)
      res.status(500).send({
        response:null,
          status: globel.statusfalse,
          httpstatus: 500,
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
  });
};


