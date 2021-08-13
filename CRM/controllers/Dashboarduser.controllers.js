const User = require("../models/Dashboarduser.models.js");
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
            message: `User already Exist .`
          });
        } else {
          res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Error updating Customer with id "
          });
        }
      }else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
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
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };


  exports.findAllroles = (req, res) => {
    User.getAllroles((err, data) => {
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

  exports.findsucessfullleadgraph = (req, res) => {
    var agentid = (req.body.agentid);
    User.Sucessfullleadgraph(agentid,(err, data) => {
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

  exports.veryfy =  (req, res) => {
    
    
    User.veryfytoken(req.arr, (err, data) => {
      if (err)
        res.status(403).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 403,
          message:
            err.message || "Forbidden."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };

exports.findOne = (req, res) => {
    var email= JSON.stringify(req.body.email);
    var password = JSON.stringify(req.body.password);
    User.findById(email , password, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(200).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Email or Password not Exist.`
            });
          }
          else if (err.kind === "param_undefined") {
            res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Param undefined.`
            });
          }  
          else {
            res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Error retrieving Customer with id " + email
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      });
  };

exports.update = (req, res) => {
    const bearerHeader = req.headers['authorization'];
    const accesstoken = req.token;
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
  
    
    
    
    
User.updatePassword(bearerHeader, accesstoken, new User(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 404,
              message: `Not found Customer with id ${req.body.Dashboarduserid}.`
            });
          } else {
            res.status(500).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 500,
              message: "Error updating Customer with id " + req.body.Dashboarduserid
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };


  exports.forgot = (req, res) => {
    var email = JSON.stringify(req.body.email)
   
    User.Fotgotpassword( email , (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            response:null,
          status: globel.statusfalse,
          httpstatus: 404,
            message: `Not found Customer with id ${email}.`
          });
        } else {
          res.status(500).send({
          response:null,
          status: globel.statusfalse,
          httpstatus: 500,
            message: "Error retrieving Customer with id " + email
          });
        }
      }  else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };



  exports.Change = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
  console.log(req.body);
  
    User.ChangePassword( 
      req.body.oldpassword,
      req.body.Dashboarduserid,
      new User(req.body), 
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 404,
            message: `Your old Password or id Is not matched`
            });
          }
          else if (err.kind === "param_undefined") {
            res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Param undefined.`
            });
          } 
          else if(err.kind === "Wrong") {
            res.status(200).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Your old Password or id Is not matched`
            });
          }
          else {
            res.status(500).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 500,
              message: "Error updating Customer with id " + req.body.Dashboarduserid
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };

  exports.Updateprofile = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
  console.log(req.body);
  
    User.UpdateProfile( 
      new User(req.body), 
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 404,
              message: `Not found Customer with id ${req.body.Dashboarduserid}.`
            });
          }
          else if (err.kind === "param_undefined") {
            res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Param undefined.`
            });
          } 
          else if(err.kind === "Wrong") {
            res.status(200).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Some thing wrong`
            });
          }
          else {
            res.status(500).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 500,
              message: "Error updating Customer with id " + req.body.Dashboarduserid
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };

  exports.findgraph = (req, res) => {
    var agentid = (req.body.agentid)
    User.getgraph(agentid,(err, data) => {
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
  
  exports.findAllTeams = (req, res) => {
    User.getAllTeams((err, data) => {
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
  
  
  
  exports.InsertTeam = (req, res) => {
    User.AddTeam( 
      new User(req.body), 
      (err, data) => {
        if (err) {
          
          if (err.kind === "param_undefined") {
            res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Param undefined.`
            });
          } 
          
          else {
            res.status(500).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 500,
              message: "Error "
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };
  
  
  
   exports.RemoveDashboarduser = (req, res) => {
    User.DeleteDashboarduser( 
      new User(req.body), 
      (err, data) => {
        if (err) {
          
          if (err.kind === "param_undefined") {
            res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Param undefined.`
            });
          }
          else if(err.kind === "Wrong") {
            res.status(200).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Some thing wrong`
            });
          } 
          
          else {
            res.status(500).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 500,
              message: "Error "
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };

  
  