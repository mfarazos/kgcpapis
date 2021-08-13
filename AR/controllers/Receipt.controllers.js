const User = require("../models/Receipt.models.js");
const globel = require("../config/messages.config.js");



exports.CreateNewuser = (req, res) => {
  User.createuser(new User(req.body),(err, data) => {
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
exports.findOne = (req, res) => {
        User.findById(new User(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_foundloginuser") {
            res.status(200).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Email or Password not Exist.`
            });
          }

          else if (err.kind === "not_update") {
            res.status(200).send({
              response:null,
            status: globel.statusfalse,
            httpstatus: 200,
            message: `Not updata data.`
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

exports.CreateClient = (req, res) => {
  
User.CreateReceipt(new User(req.body),
  (err, data) => {
      if (err) {
          res.status(500).send({
          response:null,
          status: globel.statusfalse,
          httpstatus: 500,
          message: "Error updating Customer with id " + req.body.Dashboarduserid
          });
        }
       else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    }
  );
};
exports.findallstatus = (req, res) => {
  User.getAllPaymentStatus((err, data) => {
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
exports.findCurrencyType = (req, res) => {
  User.getAllCurrencyType((err, data) => {
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
exports.findPaymentThrough = (req, res) => {
  User.getAllPaymentThrough((err, data) => {
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
exports.findPaymentType = (req, res) => {
  User.getAllPaymentType((err, data) => {
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

exports.findallclients = (req, res) => {
  User.getAllClient((err, data) => {
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

exports.findclientshistory = (req, res) => {
  User.getClienthistory(new User(req.body),(err, data) => {
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

exports.UpgradePaymentStatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(500).send({
      response:null,
            status: globel.statusfalse,
            httpstatus: 500,
      message: "Content can not be empty!"
    });
  }
  User.UpdatePaymentStatus( 
    new User(req.body), 
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 404,
            message: `Not found Customer with id ${req.body.Taskid}.`
          });
        } else {
          res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Error updating Customer with id " + req.body.Taskid
          });
        }
      } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    }
  );
};

exports.SendNotification = (req, res) => {
  User.createnotifications(new User(req.body),(err, data) => {
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
  
  
  exports.UpgradePaymentFilenumber = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(500).send({
        response:null,
              status: globel.statusfalse,
              httpstatus: 500,
        message: "Content can not be empty!"
      });
    }
    User.UpdatePaymentFileNumber( 
      new User(req.body), 
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 404,
              message: `Not found Customer with id ${req.body.Taskid}.`
            });
          } else {
            res.status(500).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 500,
              message: "Error updating Customer with id " + req.body.Taskid
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };

  exports.UpgradePaymentReceipt = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(500).send({
        response:null,
              status: globel.statusfalse,
              httpstatus: 500,
        message: "Content can not be empty!"
      });
    }
    User.UpdatePaymentReceipt( 
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
              message: "Error updating Customer with id " + req.body.Taskid
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };