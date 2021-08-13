const Callrecord = require("../models/callrecord.models.js");
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
  const callrecord = new Callrecord({
    Userid: req.body.Userid,
    VoiceLink: req.body.VoiceLink,
    Typeid: req.body.Typeid,
    Statusid: req.body.Statusid,
    ClientNumber: req.body.ClientNumber
  });

  // Save Customer in the database
  Callrecord.create(callrecord, (err, data) => {
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



exports.findCalls = (req, res) => {
  var id = (req.body.Agentid);
  var caltyp = (req.body.Calltype);
  var phone = (req.body.Clientphoneno);
  var searvhdate = (req.body.Calldatetime);

  Callrecord.getAll(id,caltyp,phone,searvhdate, (err, data) => {
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

exports.findcalltyp = (req, res) => {
  Callrecord.getAllincoming((err, data) => {
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