const Notification = require("../models/Notification.models.js");
const globel = require("../config/messages.config.js");



exports.inserttoken = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      response:null,
          status: globel.statusfalse,
          httpstatus: 400,
      message: "Content can not be empty!"
    });
  }

  
Notification.createtoken(new Notification(req.body), (err, data) => {
    if (err){
      if (err.kind === "param_undefined") {
        res.status(500).send({
        response:null,
        status: globel.statusfalse,
        httpstatus: 200,
        message: `Param undefined.`
        });
      }
      else{
      res.status(500).send({
        response:null,
        status: globel.statusfalse,
        httpstatus: 500,
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    }
  }
    else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
  });
};

exports.SendNotification = (req, res) => {
  Notification.createnotifications(new Notification(req.body),(err, data) => {
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


exports.findallnotifications = (req, res) => {
    var agentid = (req.body.agentid);
    Notification.getnotification(agentid,(err, data) => {
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
