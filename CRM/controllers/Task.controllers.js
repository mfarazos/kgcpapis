const User = require("../models/Task.models.js");
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
    // const user = new User({
    //     user_id: req.body.user_id,
    //     order_description: req.body.order_description,
    //     Leadsource: req.body.Leadsource,
    //     status_id: req.body.status_id,
    //  });
  // Save Customer in the database
    User.create(new User(req.body), (err, data) => {
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


  exports.createorderlog = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        response:null,
            status: globel.statusfalse,
            httpstatus: 400,
        message: "Content can not be empty!"
      });
    }
  
    
    User.createorderactivitylog(new User(req.body), (err, data) => {
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
  let id = (req.body.agentid);
  let sourceid = (req.body.sourceid);
  let Datetim = (req.body.Datetime);
  let orderstatus = (req.body.orderstatus);
  let teamid = (req.body.teamid);
 
    User.getAll(id,sourceid,Datetim,orderstatus,teamid,(err, data) => {
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


  exports.findtaskrecord = (req, res) => {
    var taskid = (req.body.taskid);
   
    
      User.gettask(taskid,(err, data) => {
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


  exports.findorderlog = (req, res) => {
    var id = (req.body.id);
    User.getorderlog(id,(err, data) => {
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


  exports.findallorderlog = (req, res) => {
    var id = (req.body.id);
    var date = (req.body.datetime);
    var mdate = (req.body.meetingdatetime)
    var logtype = (req.body.logtype)
    User.getallorderlog(logtype,date,mdate,id,(err, data) => {
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


  exports.findAllleads = (req, res) => {
    var agentid = (req.body.agentid); 
    User.gettotalnoofleads(agentid,(err, data) => {
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


  exports.findAllAgent = (req, res) => {
    User.getAllAgent((err, data) => {
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

  exports.findAllCompaign = (req, res) => {
    User.getAllCompaign((err, data) => {
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


  exports.findCompaigncount = (req, res) => {
    User.getcompaigncount((err, data) => {
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

  exports.findAllOrderstatus = (req, res) => {
    User.getAllOrderstatus((err, data) => {
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

  exports.findCallOutcomestatus = (req, res) => {
    User.getCalloutcomestatus((err, data) => {
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

  // Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(500).send({
      response:null,
            status: globel.statusfalse,
            httpstatus: 500,
      message: "Content can not be empty!"
    });
  }

  

  console.log(req.body);

  User.updateById( 
    req.body.Taskid,
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

exports.upgradeleadstatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(500).send({
      response:null,
            status: globel.statusfalse,
            httpstatus: 500,
      message: "Content can not be empty!"
    });
  }

  

  console.log(req.body);

  User.updateleadstatus( 
    
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


exports.upgradeuserstatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(500).send({
      response:null,
            status: globel.statusfalse,
            httpstatus: 500,
      message: "Content can not be empty!"
    });
  }

  

  console.log(req.body);

  User.updateuserstatus( 
    
    new User(req.body), 
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 404,
            message: `Not found Customer with id ${req.body.user_id}.`
          });
        } else {
          res.status(500).send({
            response:null,
            status: globel.statusfalse,
            httpstatus: 500,
            message: "Error updating Customer with id " + req.body.user_id
          });
        }
      } else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
    }
  );
};

exports.findUserdetail = (req, res) => {
  User.getuserdetail(new User(req.body),(err, data) => {
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
    }else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
  });
};

exports.findmeetingnotification = (req, res) => {
  User.Getmeetingnotification(new User(req.body),(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          response:null,
          status: globel.statusfalse,
          httpstatus: 404,
          message: `Not found data.`
        });
      } else {
        res.status(500).send({
          response:null,
          status: globel.statusfalse,
          httpstatus: 500,
          message: "Error updating Customer with id " + req.body.Taskid
        });
      }
    }else res.send({httpstatus: 200, status: globel.statustrue, message: globel.messagesucess , count: data.length, response: data});
  });
};

