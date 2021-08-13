const sql = require("./dbcrm.js");
const jwt = require("jsonwebtoken");
const sendemail = require("./Sendemail.models.js");
const { getMaxListeners } = require("./dbcrm.js");
const { use } = require("./Sendemail.models.js");

// constructor
const User = function(user) {
  this.Sector_id = user.Sector_id;
  this.projectid = user.projectid;
  this.streetid = user.streetid;
  this.Plotid = user.Plotid;
  this.orderstatus = user.orderstatus;
  this.Taskid = user.Taskid;
  this.userid = user.userid;
  
};

User.getAll = result => {
  sql.query("SELECT * FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("project: ", res);
    result(null, res);
  });
};

User.getuserplotinfo = (userid,result) => {
  sql.query(`SELECT pi.Plot_no,tu.user_id,tu.user_name, tu.CNIC, pr.Project_name, sc.Sector_Name , st.Streename, di.DirectionName, pt.PlotType_Name, pg.CategoryName, ps.PositionName, ts.status_name, hs.status_name AS House_Status FROM project AS pr INNER JOIN sectors AS sc ON pr.Project_id = sc.Project_id INNER JOIN streets AS st ON sc.Sector_id = st.Sector_id INNER JOIN plotinfo AS pi ON st.Street_id = pi.Street_id INNER JOIN direction AS di ON pi.Direction_id = di.Direction_id INNER JOIN plottype AS pt ON pi.PlotType_id = pt.PlotType_id INNER JOIN plotcategory AS pg ON pi.Category_id = pg.Category_id INNER JOIN position AS ps ON pi.Position_id = ps.pos_id INNER JOIN tbl_status AS ts ON pi.Status_id = ts.status_id INNER JOIN tbl_status AS hs ON pi.House_Status = hs.status_id INNER JOIN tbl_lead AS tl ON pi.Plotid = tl.Plotid INNER JOIN tbl_user AS tu ON tl.user_id = tu.user_id WHERE tu.user_id = ${userid};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("project: ", res);
    result(null, res);
  });
};

User.getsectors = (projectid,result) => {
  console.log(projectid);
  sql.query(`SELECT * FROM sectors WHERE Project_id = ${projectid};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("project: ", res);
    result(null, res);
  });
};


User.getstreets = (Sector_id,result) => {
  console.log(Sector_id);
  sql.query(`SELECT * FROM streets WHERE Sector_id = ${Sector_id};`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("project: ", res);
    result(null, res);
  });
};

User.getplot = (user,result) => {
 
  sql.query("SELECT pi.*, pr.Project_name, sc.Sector_Name , st.Streename, di.DirectionName, pt.PlotType_Name, pg.CategoryName, ps.PositionName, ts.status_name, hs.status_name AS House_Status FROM project AS pr INNER JOIN sectors AS sc ON pr.Project_id = sc.Project_id INNER JOIN streets AS st ON sc.Sector_id = st.Sector_id INNER JOIN plotinfo AS pi ON st.Street_id = pi.Street_id INNER JOIN direction AS di ON pi.Direction_id = di.Direction_id INNER JOIN plottype AS pt ON pi.PlotType_id = pt.PlotType_id INNER JOIN plotcategory AS pg ON pi.Category_id = pg.Category_id INNER JOIN position AS ps ON pi.Position_id = ps.pos_id INNER JOIN tbl_status AS ts ON pi.Status_id = ts.status_id INNER JOIN tbl_status AS hs ON pi.House_Status = hs.status_id WHERE pr.Project_id = ? && sc.Sector_id = ?",
  [user.projectid, user.Sector_id],
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("project: ", res);
    result(null, res);
  });
};

User.gethousestatus = (result) => {
  sql.query("SELECT * FROM tbl_status WHERE tbl_status.StatusTypeid = 6", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.getdirection = result => {
  sql.query("SELECT * FROM direction", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.getposition = result => {
  sql.query("SELECT * FROM position", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.getplottype = result => {
  sql.query("SELECT * FROM plottype", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.getplotcategory = result => {
  sql.query("SELECT * FROM plotcategory", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.addplot = (user, result) => {
  const nDate = new Date();
sql.query(`SELECT tbl_lead.Plotid FROM tbl_lead WHERE tbl_lead.Taskid = ${user.Taskid}`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res[0].Plotid !== null){
      result({ kind: "Exist"}, null);
      return;
    }
    
  sql.query(`UPDATE tbl_lead, plotinfo SET tbl_lead.orderstatus = 9, plotinfo.House_Status = 28, tbl_lead.Plotid = ${user.Plotid} WHERE tbl_lead.Taskid = ${user.Taskid} AND plotinfo.Plotid = ${user.Plotid};`,(err, res1) => {
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
     sql.query(`SELECT pi.Plot_no,tu.user_id,tu.user_name, tu.CNIC, pr.Project_name, sc.Sector_Name , st.Streename, di.DirectionName, pt.PlotType_Name, pg.CategoryName, ps.PositionName, ts.status_name, hs.status_name AS House_Status FROM project AS pr INNER JOIN sectors AS sc ON pr.Project_id = sc.Project_id INNER JOIN streets AS st ON sc.Sector_id = st.Sector_id INNER JOIN plotinfo AS pi ON st.Street_id = pi.Street_id INNER JOIN direction AS di ON pi.Direction_id = di.Direction_id INNER JOIN plottype AS pt ON pi.PlotType_id = pt.PlotType_id INNER JOIN plotcategory AS pg ON pi.Category_id = pg.Category_id INNER JOIN position AS ps ON pi.Position_id = ps.pos_id INNER JOIN tbl_status AS ts ON pi.Status_id = ts.status_id INNER JOIN tbl_status AS hs ON pi.House_Status = hs.status_id INNER JOIN tbl_lead AS tl ON pi.Plotid = tl.Plotid INNER JOIN tbl_user AS tu ON tl.user_id = tu.user_id WHERE tu.user_id = ${user.userid};`, (err, res2) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res2);
      result(null, res2);
    });
   });
  });
};


module.exports = User;