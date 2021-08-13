const sql = require("./dbcrm.js");
const jwt = require("jsonwebtoken");
const sendemail = require("./Sendemail.models.js");
const { getMaxListeners } = require("./dbcrm.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.name = user.name;
  this.phoneNo = user.phoneNo;
  this.status_id = user.status_id;
  this.Description = user.Description;
  this.role_id = user.role_id;
  this.Dashboarduserid = user.Dashboarduserid;
   this.teamid = user.teamid;
   this.TeamName = user.TeamName;
   
   
  
};

User.create = (user, result) => {
  
  sql.query("SELECT COUNT(*) AS user FROM tbl_dashboard WHERE tbl_dashboard.email = ?",[user.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var usercount =  (res[0].user);
    console.log(usercount);
    if(usercount === 0){
          sql.query("INSERT INTO tbl_dashboard SET  email = ?, password = ?, name = ?, phoneNo = ?, Description = ?,  role_id = ?, teamid = ?, status_id = 4", [user.email, user.password, user.name, user.phoneNo, user.Description, user.role_id, user.teamid], (err, res1) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }


          console.log("created customer: ", { id: res1.insertId, ...user });
          result(null, { id: res1.insertId, ...user });
            });
      }
      else if(usercount > 0){
          
          result({ kind: "Exist" }, null);
      }
      
    });
};

User.getAll = result => {
    sql.query("SELECT tbl_dashboard.*, tbl_user_role.user_role_name, tbl_team.TeamName FROM tbl_dashboard INNER JOIN tbl_user_role ON tbl_dashboard.role_id = tbl_user_role.role_id LEFT JOIN tbl_team ON tbl_dashboard.teamid = tbl_team.teamid WHERE tbl_dashboard.status_id = 4", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

  User.Sucessfullleadgraph = (agentid,result) => {
    let ke = "";
    if(agentid == null){
      ke = `SELECT count(tbl_lead.Taskid) as Sucessfulllead, YEAR(Editon) as year, MONTH(Editon) as month FROM tbl_lead WHERE tbl_lead.orderstatus = 9 GROUP BY YEAR(Editon), MONTH(Editon) ORDER BY YEAR(Editon) DESC, MONTH(Editon) DESC`;
    }
    else{
      ke = `SELECT count(tbl_lead.Taskid) as Sucessfulllead, YEAR(Editon) as year, MONTH(Editon) as month FROM tbl_lead WHERE tbl_lead.orderstatus = 9 && tbl_lead.handled_by = ${agentid}  GROUP BY YEAR(Editon), MONTH(Editon) ORDER BY YEAR(Editon) DESC, MONTH(Editon) DESC`;
    }
    sql.query(ke, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };



User.veryfytoken = (arr,result) => {
    result(null,arr);
  };

User.findById = (email, password, result) => {

    if(email === undefined || password === undefined){  
      result({ kind: "param_undefined" }, null);
      return;
    }
   sql.query(`SELECT * FROM tbl_dashboard WHERE email = ${email} AND password = ${password};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        
        var user = (res[0]);
        jwt.sign({user}, 'secretkey',{expiresIn: '1d'}, (err,token) =>{
          console.log(user)
          token
           let arr = [];
          arr.push({token: token, teamid: res[0].teamid, roleid: res[0].role_id})
           result(null, arr);
        });
         console.log("found customer: ", res[0]);
         //result(null, token);
         return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });

 };

User.Fotgotpassword = (email, result) => {
    sql.query(`SELECT Dashboarduserid FROM tbl_dashboard WHERE email = ${email};`,(err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.length === 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
        if (res.length) {
          //var ntoken;
          var userid = (res[0].Dashboarduserid);
          jwt.sign({userid}, 'secretkey',{expiresIn : '1h'},(err,token) =>{
            if (err) {
              result(null, err);
              return;
            }
            console.log(userid)
            token
            var url = "localhost:3000/auth/reset?param=" + token;
            var message = "Please click on given link to Change your Password account. <a href='https://" + url + "'>Click here<a/><br> Or just copy and paste this url in your browser<br>"
            var mailOptions = {
              from: 'farazahmed.fa276@gmail.com',
              to: email,
              subject: 'Forgot Password',
              html: 'Dear Customer,<br/>' + message + '<br/><br/><b>Please feel free to contact us at kgcp.com.pk in case of any queries.</b><br/></br>Thank you<br/><br/>Natalie<br/>Customer Support Manager<br/>Instakin.com<br/>Helping KGC-Properties Pakistan'
             // text: 'Plz click this link '+url+''
            };
            sendemail.sendMail(mailOptions, function(error, info){
              if (error) {
                result(null, error);
                return;
              } else {
                console.log('Email sent: ' + info.response);
                var arr = [];
                arr.push({'token':token, 'sentmail':info.response});
                result(null, arr);
              }
            });
             //result(null, token);
          });
           console.log("found customer: ", res[0]);
           //result(null, token);
           return;
        }
        

        
  
        // console.log(res);
        // result(null, res);
      });
  };

User.updatePassword = (bearerHeader, accesstoken, user, result) => {

    if(typeof bearerHeader !== undefined){
      const bearar = bearerHeader.split(' ');
      const bearartoken = bearar[1];
      accesstoken = bearartoken;
      jwt.verify(accesstoken, 'secretkey', (err, authdata) =>{
          if(err){
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log(authdata.userid);
          sql.query("UPDATE tbl_dashboard SET password = ? WHERE Dashboarduserid = ?",
          [user.password, authdata.userid],
          (err, res) => {
          if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
          }
  
          if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
          }
  
          //console.log("updated customer: ", { Dashboarduserid: Dashboarduserid, ...user });
          result(null, { Dashboarduserid: authdata, ...user});
        });
          


      });

    }
    
  };


User.ChangePassword = (oldpass,Dashboarduserid,user, result) => {
    if(oldpass === undefined || Dashboarduserid === undefined || user.password === undefined){  
      result({ kind: "param_undefined" }, null);
      return;
    }
    sql.query("UPDATE tbl_dashboard SET tbl_dashboard.password = ? WHERE Dashboarduserid = ? AND tbl_dashboard.password = ?",
        [user.password, Dashboarduserid, oldpass],
    (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "Wrong" }, null);
          return;
        }
  
        console.log("updated customer: ", { Dashboarduserid: Dashboarduserid, ...user });
        result(null, { Dashboarduserid: Dashboarduserid, ...user });
      }
    );
  };



User.AddTeam = (user, result) => {
    if(user.TeamName === undefined || user.Description === undefined || user.Dashboarduserid === undefined){  
      result({ kind: "param_undefined" }, null);
      return;
    }
    sql.query("SELECT COUNT(*) AS user FROM tbl_team WHERE tbl_team.TeamName = ? && Status_id = 4",[user.TeamName], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var teaminfo =  (res[0].user);
    
    if(teaminfo === 0){
    sql.query("INSERT INTO tbl_team SET TeamName = ?, Description = ?, Status_id = 4",
        [user.TeamName,user.Description],
    (err, res1) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        sql.query("UPDATE tbl_dashboard SET tbl_dashboard.teamid = ? WHERE tbl_dashboard.Dashboarduserid = ? && tbl_dashboard.status_id = 4",
        [res1.insertId, user.Dashboarduserid],
    (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        // if (res.affectedRows == 0) {
        //   // not found Customer with the id
        //   result({ kind: "Wrong" }, null);
        //   return;
        // }
        
  
        console.log("customer: ", { Temid: res1.insertId, ...user });
        result(null, { Temid: res1.insertId, ...user });
      });
     });
    }
    else if(teaminfo > 0){
          var arr = [{Team:"Team already Exist"}];
          result(null, arr);
          return;
    }
    });
  };


User.UpdateProfile = (user, result) => {
  if(user.name === undefined || user.phoneNo === undefined || user.email === undefined || user.Dashboarduserid === undefined){  
    result({ kind: "param_undefined" }, null);
    return;
  }
    sql.query("UPDATE tbl_dashboard SET tbl_dashboard.name = ? , tbl_dashboard.phoneNo = ? , tbl_dashboard.email = ? WHERE tbl_dashboard.Dashboarduserid = ?",
        [user.name, user.phoneNo, user.email, user.Dashboarduserid],
    (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "Wrong" }, null);
          console.log(user);
          return;
        }
  
        // if (res.affectedRows == 0) {

        //   // not found Customer with the id
        //   result({ kind: "not_found" }, null);
        //   return;
        // }
  
        console.log("updated customer: ", { Dashboarduserid: user });
        result(null, { Dashboarduserid:  user });
      }
    );
  };

User.getgraph = (agentid,result) => {
   
    sql.query("SELECT count(Taskid) as assigndate, YEAR(Editon) as year, MONTH(Editon) as month FROM tbl_lead WHERE tbl_lead.handled_by = ? GROUP BY YEAR(Editon), MONTH(Editon) ORDER BY YEAR(Editon) DESC, MONTH(Editon) DESC; ",[agentid], (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      sql.query("SELECT count(orderactivitylog.logtype) as totalcalls, YEAR(Datetime) as year, MONTH(Datetime) as month FROM orderactivitylog WHERE orderactivitylog.Dashboarduserid = ? && orderactivitylog.logtype = 21 GROUP BY YEAR(Datetime), MONTH(Datetime) ORDER BY YEAR(Datetime) DESC, MONTH(Datetime) DESC",[agentid], (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        sql.query("SELECT count(orderactivitylog.CallOutcome) as connectedcalls, YEAR(Datetime) as year, MONTH(Datetime) as month FROM orderactivitylog WHERE orderactivitylog.Dashboarduserid = ? && orderactivitylog.logtype = 21 && orderactivitylog.CallOutcome = 18 GROUP BY YEAR(Datetime), MONTH(Datetime) ORDER BY YEAR(Datetime) DESC, MONTH(Datetime) DESC",[agentid], (err, res3) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          
          var arr = [];
          arr.push({"TotalAssignTask":res1, "TotalCalls": res2, "TotalConnectedCalls": res3});
          
          
          console.log("customers: ", arr);
          result(null, arr);
        });

        
        
        
        
      });
      
      
  
      
    });
  };

User.getAllroles = result => {
    sql.query("SELECT * FROM tbl_user_role WHERE status_id = 4", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.length === 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("customers: ", res);
      result(null, res);
    });
};

User.getAllTeams = result => {
  sql.query("SELECT * FROM tbl_team WHERE Status_id = 4", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.length === 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("customers: ", res);
    result(null, res);
  });
};



User.DeleteDashboarduser = (user, result) => {
  if(user.Dashboarduserid === undefined){  
    result({ kind: "param_undefined" }, null);
    return;
  }
  sql.query("SELECT tbl_lead.Taskid FROM tbl_lead WHERE tbl_lead.handled_by = ? && tbl_lead.status_id != 15 && tbl_lead.orderstatus != 9",[user.Dashboarduserid], (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  var teaminfo =  (res.length);
  
  if(teaminfo > 0){
    const nDate = new Date();
    res.forEach(element => {
      sql.query("UPDATE tbl_lead SET assigned_by = ?, handled_by = ?, LeadStageStatus = ?, Editon = ? WHERE Taskid = ?",
        [user.assigned_by = null, user.handled_by = null, user.LeadStageStatus = 39, nDate, element.Taskid],
     (err, res1) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "Wrong" }, null);
          return;
        }
       
      });
    });
  }
        sql.query("UPDATE tbl_dashboard SET tbl_dashboard.status_id = 15 WHERE tbl_dashboard.Dashboarduserid = ? && tbl_dashboard.status_id = 4",
        [user.Dashboarduserid],
          (err, res2) => {
              if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
              }
              if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "Wrong" }, null);
                return;
              }
              

              console.log(user);
              result(null, user);
            });
    });
};
  
module.exports = User;