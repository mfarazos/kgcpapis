const sql = require("./dbcrm.js");

//const email = require("./Sendemail.models.js");

// constructor
const User = function(user) {
  this.user_id = user.user_id;
  this.order_description = user.order_description;
  this.Leadsource = user.Leadsource;
  this.status_id = user.status_id;
  this.assigned_by = user.assigned_by;
  this.handled_by = user.handled_by;
  this.Taskid = user.Taskid;
  this.Note = user.Note;
  this.orderstatus = user.orderstatus;
  this.Dashboarduserid = user.Dashboarduserid;
  this.datetime = user.datetime;
  this.Meetingdatetime = user.Meetingdatetime;
  this.logtype = user.logtype;
  this.CallOutcome = user.CallOutcome;
  this.email = user.email;
  this.phone = user.phone;
  this.teamid = user.teamid;
  this.LeadStageStatus = user.LeadStageStatus;
};



User.create = (user, result) => {
    
  sql.query("INSERT INTO tbl_lead SET user_id = ?, Dashboarduserid = ?, order_description = ?, Leadsource = ?, status_id = ?, assigned_by = ?, handled_by = ? ", 
    [user.user_id, user.Dashboarduserid, user.order_description,  user.Leadsource, user.status_id, user.assigned_by, user.handled_by],
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    result(null, { id: res.insertId, ...user });
  });
};


User.createorderactivitylog = (user, result) => {
  sql.query("INSERT INTO orderactivitylog SET Taskid = ?, Note = ?, Meetingdatetime = ?, orderstatus = ?, status_id = ? , logtype = ?, CallOutcome = ?,  Dashboarduserid = ?", 
    [user.Taskid, user.Note, user.Meetingdatetime, user.orderstatus, user.status_id, user.logtype, user.CallOutcome, user.Dashboarduserid],
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...user });
    result(null, { id: res.insertId, ...user });
  });
};


User.getAll = (id,sourceid,Datetim,orderstatus,teamid,result) => {
  sql.query("SELECT tbl_user.user_name, if(tbl_user.Father_Spouse_Name is null, 'N/A',tbl_user.Father_Spouse_Name) AS FatherName, if(tbl_user.CNIC is null, 'N/A',tbl_user.CNIC) AS CNIC, if(tbl_user.Address_Residence is null, 'N/A', tbl_user.Address_Residence) AS Address, if(tbl_user.Dateofbirth is null, 'N/A', tbl_user.Dateofbirth) AS DateofBirth, tbl_user.user_id, tbl_user.user_phone, tbl_lead.Leadsource as sourceid, tbl_lead.Editon as AssignDate,tbl_lead.LeadStageStatus, lss.status_name as LeadStageStatusName, tbl_lead.orderstatus, os.status_name AS orderstatusname, tbl_status.status_name, tbl_user.user_email, tbl_lead.Taskid, if(tbl_lead.assigned_by is null, 'N/A',tbl_lead.assigned_by) as managerid, if(tbl_lead.handled_by is null, 'N/A',tbl_lead.handled_by) as agentid, tbl_status.status_name, tbl_campaign.campaign_name as sourcename, tbl_lead.Datetime, if(assignby.name is null, 'N/A',assignby.name) as Assignby, if(handleby.name is null, 'N/A',handleby.name) as Agent, if(handleby.teamid is null, 'N/A',handleby.teamid) as Teamid,if(oal.Datetime is null, 'N/A',oal.Datetime) AS lastactivitydatetime FROM tbl_lead INNER JOIN tbl_user ON tbl_user.user_id = tbl_lead.user_id INNER JOIN tbl_campaign ON tbl_lead.Leadsource = tbl_campaign.campaign_id INNER JOIN tbl_status ON tbl_lead.status_id = tbl_status.status_id LEFT JOIN tbl_dashboard assignby ON tbl_lead.assigned_by = assignby.Dashboarduserid LEFT JOIN tbl_dashboard handleby ON tbl_lead.handled_by = handleby.Dashboarduserid LEFT JOIN orderactivitylog oal ON tbl_lead.Taskid = oal.Taskid INNER JOIN tbl_status os ON tbl_lead.orderstatus = os.status_id INNER JOIN tbl_status lss ON tbl_lead.LeadStageStatus = lss.status_id WHERE tbl_lead.status_id != 15 GROUP BY tbl_lead.Taskid", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    var arr = [];
    var dataholder = res;
    
    if (id === null &&  sourceid === null && Datetim === null && orderstatus === null && teamid === null) {
     //for manager
      arr = dataholder;
      arr.reverse();
      result(null, arr);
      return;
     }
//for agent
     else{
       
     if(id !== null){
        var agentid = JSON.stringify(id);
        dataholder.forEach(element => {
          if(element.agentid === agentid){
            arr.push(element);
          }
        });
      } else if(id === null){
        arr = dataholder;
        console.log("id is undefined");
      }

      //for Sourceid
      
            if(sourceid !== null && sourceid !== undefined){
              dataholder = [];
              for (var i = 0; i < arr.length; i++){
                if(arr[i].sourceid === sourceid){
                  dataholder.push(arr[i])
                }
                
              }
              arr = [];
              arr = dataholder;
            } else if(sourceid === null){
              console.log("sourceid is undefined");
            }


            //for Teamid
      
            if(teamid !== null && teamid !== undefined){
              var steamid = JSON.stringify(teamid);
              dataholder = [];
              for (var i = 0; i < arr.length; i++){
                if(arr[i].Teamid === steamid){
                  dataholder.push(arr[i])
                }
                
              }
              arr = [];
              arr = dataholder;
            } else if(teamid === null){
              console.log("teamid is undefined");
            }

            //for orderstatus
      
            if(orderstatus !== null && orderstatus !== undefined){
              dataholder = [];
              for (var i = 0; i < arr.length; i++){
                if(arr[i].orderstatus === orderstatus || arr[i].LeadStageStatus === orderstatus){
                  dataholder.push(arr[i])
                }
                
              }
              arr = [];
              arr = dataholder;
            } else if(orderstatus === null){
              console.log("orderstatus is undefined");
            }
  

            //For date
          
          if(Datetim !== null && Datetim !== undefined){
            var resdate = new Date(Datetim);
            dataholder = [];
            for (var k = 0; k < arr.length; k++){
              var responsedate = new Date(arr[k].Datetime);
              
                if((resdate.getMonth() + 1) === (responsedate.getMonth() + 1) && (resdate.getFullYear()) === (responsedate.getFullYear()) && (resdate.getDate()) === (responsedate.getDate())){
                  dataholder.push(arr[k])
                }
              }
              arr = [];
              arr = dataholder;
          } else if(Datetim === null && Datetim === undefined){
            console.log("Date is undefined");
          }
         arr.reverse(); 
         console.log("customers: ", arr);
          result(null, arr);
     }
    
      
  });
  
};

User.gettask = (taskid,result) => {
  sql.query(`SELECT tbl_user.user_name, tbl_user.user_id, tbl_user.user_phone, tbl_lead.Leadsource as sourceid, tbl_lead.Editon as AssignDate, tbl_lead.orderstatus, os.status_name AS orderstatusname, tbl_status.status_name, tbl_user.user_email, tbl_lead.Taskid, if(tbl_lead.assigned_by is null, 'N/A',tbl_lead.assigned_by) as managerid, if(tbl_lead.handled_by is null, 'N/A',tbl_lead.handled_by) as agentid, tbl_status.status_name, tbl_campaign.campaign_name as sourcename, tbl_lead.Datetime, if(assignby.name is null, 'N/A',assignby.name) as Assignby, if(handleby.name is null, 'N/A',handleby.name) as Agent, (SELECT orderactivitylog.datetime AS lastactivitydatetime FROM orderactivitylog WHERE orderactivitylog.Taskid = ${taskid} ORDER BY id DESC LIMIT 1) AS lastactivitydatetime FROM tbl_lead INNER JOIN tbl_user ON tbl_user.user_id = tbl_lead.user_id INNER JOIN tbl_campaign ON tbl_lead.Leadsource = tbl_campaign.campaign_id INNER JOIN tbl_status ON tbl_lead.status_id = tbl_status.status_id LEFT JOIN tbl_dashboard assignby ON tbl_lead.assigned_by = assignby.Dashboarduserid LEFT JOIN tbl_dashboard handleby ON tbl_lead.handled_by = handleby.Dashboarduserid INNER JOIN tbl_status os ON tbl_lead.orderstatus = os.status_id WHERE tbl_lead.Taskid = ${taskid};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

   
    
    result(null, res);
      
  });
  
};

User.getorderlog = (id,result) => {
    
    console.log(id);
    sql.query(`SELECT orderactivitylog.*, tbl_dashboard.name, tbl_status.status_name AS Orderstatusname, COD.status_name AS CallOutcomedescription FROM orderactivitylog INNER JOIN tbl_dashboard ON orderactivitylog.Dashboarduserid = tbl_dashboard.Dashboarduserid INNER JOIN tbl_status ON orderactivitylog.orderstatus = tbl_status.status_id LEFT JOIN tbl_status COD ON orderactivitylog.CallOutcome = COD.status_id WHERE Taskid = ${id};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      // if (res.length === 0) {
      //   // not found Customer with the id
      //   result({ kind: "not_found" }, null);
      //   return;
      // }
      
      // if (id === null || id === undefined) {
       
      //   result(null, res);
      //  }
      //  else{
      //   if(id !== null){
      //     var arr = [];
      //     var userid = JSON.stringify(id);
      //     res.forEach(element => {
      //       if(element.agentid === userid){
      //         arr.push(element);
      //       }
      //     });
      //   } 
      //   console.log("customers: ", arr);
      // result(null, arr);
      //  }
      
      console.log("customers: ", res);
       result(null, res);
    });
    
    
  };

User.getallorderlog = (logtype,Datetim,mdate,id,result) => {
    console.log(Datetim);
    console.log(id);
    console.log(logtype);
    console.log(mdate);
    sql.query(`SELECT orderactivitylog.*, tu.user_name AS name, tbl_status.status_name AS Orderstatusname, COD.status_name AS CallOutcomedescription FROM orderactivitylog INNER JOIN tbl_dashboard ON orderactivitylog.Dashboarduserid = tbl_dashboard.Dashboarduserid INNER JOIN tbl_status ON orderactivitylog.orderstatus = tbl_status.status_id INNER JOIN tbl_lead AS tl ON orderactivitylog.Taskid = tl.Taskid INNER JOIN tbl_user AS tu ON tl.user_id = tu.user_id LEFT JOIN tbl_status COD ON orderactivitylog.CallOutcome = COD.status_id WHERE orderactivitylog.Dashboarduserid = ${id};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
     
      var arr = [];
      var dataholder = res;
    
    if(Datetim === null &&  logtype === null && mdate === null){
      arr = dataholder;
      result(null, arr);
     }
    else{
          //for Datetime
          if(Datetim !== null && Datetim !== undefined){
            var resdate = new Date(Datetim);
            dataholder = [];
            for (var k = 0; k < res.length; k++){
              var responsedate = new Date(res[k].Datetime);
              
                if((resdate.getMonth() + 1) === (responsedate.getMonth() + 1) && (resdate.getFullYear()) === (responsedate.getFullYear()) && (resdate.getDate()) === (responsedate.getDate())){
                  dataholder.push(res[k])
                }
              }
              res = [];
              res = dataholder;
          } else if(Datetim === null && Datetim === undefined){
            console.log("Date is undefined");
          }


            //for meeting datetime

          if(mdate !== null && mdate !== undefined){
            var resdate = new Date(mdate);
            dataholder = [];
            for (var k = 0; k < res.length; k++){
              var responsedate = new Date(res[k].Meetingdatetime);
              
                if((resdate.getMonth() + 1) === (responsedate.getMonth() + 1) && (resdate.getFullYear()) === (responsedate.getFullYear()) && (resdate.getDate() + 1) === (responsedate.getDate())){
                  dataholder.push(res[k])
                }
              }
              res = [];
              res = dataholder;
          } else if(Datetim === null && Datetim === undefined){
            console.log("Date is undefined");
          }

            //for log type
          if(logtype !== null && logtype !== undefined && logtype !== 0){
            dataholder = [];
            for (var i = 0; i < res.length; i++){
              if(res[i].logtype === logtype){
                dataholder.push(res[i])
              }
             }
            res = dataholder;
          } else if(logtype === null){
            console.log("logtype is undefined");
          }

          console.log("faraz");
          result(null, res);

        }

     
      
      
    });
    
    
  };


User.gettotalnoofleads = (agentid,result) => {
    sql.query(`SELECT COUNT(*) AS totalleads, (SELECT COUNT(*) FROM tbl_lead WHERE status_id != 15 AND orderstatus = 9 AND handled_by = ${agentid}) as done FROM tbl_lead WHERE status_id != 15 AND handled_by = ${agentid};`, (err, res) => {
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
 
User.getAllAgent = result => {
    sql.query("SELECT tbl_dashboard.name, tbl_dashboard.teamid, tbl_dashboard.Dashboarduserid, tbl_dashboard.phoneNo, tbl_dashboard.role_id, token.fcmtoken FROM tbl_dashboard LEFT JOIN token ON tbl_dashboard.Dashboarduserid = token.Dashboarduserid WHERE role_id = 2 AND status_id = 4", (err, res) => {
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

User.getAllCompaign = result => {
    sql.query("SELECT * FROM tbl_campaign", (err, res) => {
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



User.getAllOrderstatus = result => {
    sql.query("SELECT * FROM tbl_status WHERE tbl_status.StatusTypeid = 2 OR tbl_status.StatusTypeid = 7", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

User.getCalloutcomestatus = result => {
    sql.query("SELECT * FROM tbl_status WHERE tbl_status.StatusTypeid = 4", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

  User.getcompaigncount = result => {
    sql.query("SELECT tbl_campaign.campaign_name, tbl_campaign.campaign_id, COUNT(tbl_lead.Leadsource) AS totalleads FROM tbl_campaign LEFT OUTER JOIN tbl_lead ON tbl_lead.Leadsource = tbl_campaign.campaign_id WHERE tbl_lead.status_id != 15 GROUP BY tbl_lead.Leadsource", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  

User.updateById = (Taskid,user, result) => {
     const nDate = new Date();
     if(user.LeadStageStatus === 39){
        user.LeadStageStatus = 40;
     }
      if(user.LeadStageStatus === null){
      user.LeadStageStatus = 39;
     }

     sql.query("UPDATE tbl_lead SET assigned_by = ?, handled_by = ?, LeadStageStatus = ?, Editon = ? WHERE Taskid = ?",
        [user.assigned_by, user.handled_by, user.LeadStageStatus, nDate, Taskid],
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
  
        console.log("updated customer: ", { Taskid: Taskid, ...user });
        result(null, { Taskid: Taskid, ...user });
      }
    );
  };

User.updateleadstatus = (user, result) => {
    sql.query("UPDATE tbl_lead SET orderstatus = ? WHERE Taskid = ? OR user_id = ?",
        [user.orderstatus, user.Taskid, user.user_id],
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
  
        console.log("updated customer: ", { user });
        result(null, { user });
      }
    );
  };


User.updateuserstatus = (user, result) => {
    sql.query("UPDATE tbl_lead SET status_id = ? WHERE user_id = ?",
        [user.status_id, user.user_id],
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
  
        console.log("updated customer: ", { user });
        result(null, { user });
      }
    );
  };

User.getuserdetail = (user ,result) => {
    sql.query("SELECT orderactivitylog.*, tu.user_name AS Clientname, tu.user_email, tu.user_phone, tbl_dashboard.name AS Agentname, tbl_dashboard.teamid, tbl_status.status_name AS Orderstatusname, COD.status_name AS CallOutcomedescription FROM orderactivitylog INNER JOIN tbl_dashboard ON orderactivitylog.Dashboarduserid = tbl_dashboard.Dashboarduserid INNER JOIN tbl_status ON orderactivitylog.orderstatus = tbl_status.status_id INNER JOIN tbl_lead AS tl ON orderactivitylog.Taskid = tl.Taskid INNER JOIN tbl_user AS tu ON tl.user_id = tu.user_id LEFT JOIN tbl_status COD ON orderactivitylog.CallOutcome = COD.status_id WHERE tu.user_email = ? && tu.user_phone = ?",
    [user.email, user.phone],(err, res) => {
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
User.Getmeetingnotification = (user ,result) => {
  sql.query("SELECT orderactivitylog.*, tbl_dashboard.teamid FROM orderactivitylog LEFT JOIN tbl_dashboard ON tbl_dashboard.Dashboarduserid = orderactivitylog.Dashboarduserid WHERE orderactivitylog.logtype = 22 && orderactivitylog.orderstatus = 8 OR orderactivitylog.orderstatus = 32 OR orderactivitylog.orderstatus = 33",(err, res) => {
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
    
    let arr = [];
    if(user.teamid === null){
      result(null, res);
      return;
    }
    if(user.teamid !== null){
      res.forEach(element => {
        if(element.teamid === user.teamid){
          arr.push(element);
        }
      });
    } 
    
    console.log("arr: ", arr);
    result(null, arr);
  });
};

  module.exports = User;
