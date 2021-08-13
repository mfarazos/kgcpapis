const Request = require("../models/Request.models");
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
    const request = new Request({
        affectedtype: req.body.affectedtype,
        requestnature: req.body.requestnature,
        requestedby: req.body.requestedby,
        remarks: req.body.remarks,
        request_status: req.body.request_status,
     });
  // Save Customer in the database
  Request.create(request, (err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while creating the Request."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };

  exports.findAll = (req, res) => {
    Request.getAll((err, data) => {
      if (err)
        res.status(500).send({
          response:null,
            status: globel.statusfalse,
            httpstatus: 500,
          message:
            err.message || "Some error occurred while retrieving Request."
        });
      else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    });
  };