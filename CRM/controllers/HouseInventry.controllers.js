const User = require("../models/HouseInventry.models.js");
const globel = require("../config/messages.config.js");
exports.findprojects = (req, res) => {
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


  exports.finduserplotnfo = (req, res) => {
    var userid = (req.body.userid);
    User.getuserplotinfo(userid,(err, data) => {
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


  exports.findSectors = (req, res) => {
    var projectid = (req.body.projectid);
    User.getsectors(projectid,(err, data) => {
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

  exports.findStreets = (req, res) => {
    var Sector_id = (req.body.Sector_id);
    User.getstreets(Sector_id,(err, data) => {
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

  exports.findPlots = (req, res) => {
    
    User.getplot(new User(req.body),(err, data) => {
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

  exports.findhousestatus = (req, res) => {
    User.gethousestatus((err, data) => {
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

  exports.finddirection = (req, res) => {
    User.getdirection((err, data) => {
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

  exports.findposition = (req, res) => {
    User.getposition((err, data) => {
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

  exports.findplottype = (req, res) => {
    User.getplottype((err, data) => {
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

  exports.findplotcatrgory = (req, res) => {
    User.getplotcategory((err, data) => {
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

  exports.sellplot = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(500).send({
        response:null,
              status: globel.statusfalse,
              httpstatus: 500,
        message: "Content can not be empty!"
      });
    }User.addplot( 
      new User(req.body), 
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 404,
              message: `Not found`
            });

          }
          else if (err.kind === "Exist") {
            res.status(200).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 200,
              message: `this order already get a plot`
            });
          } 
          
          else {
            res.status(500).send({
              response:null,
              status: globel.statusfalse,
              httpstatus: 500,
              message: "Error updating "
            });
          }
        } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
      }
    );
  };