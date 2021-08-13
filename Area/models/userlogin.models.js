const sql = require("./db.js");

const Userlogin = function(userlogin) {
  this.Statusid = userlogin.Statusid;
  this.Userid = userlogin.Userid;
  this.Activityid	 = userlogin.Activityid	;
  };


  Userlogin.createactivitylog = (newUserlogin, result) => {
    sql.query("INSERT INTO activity_log SET ?", newUserlogin, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created customer: ", { id: res.insertId, ...newUserlogin });
      result(null, { id: res.insertId, ...newUserlogin });
    });
  };


  Userlogin.getAll = result => {
    sql.query("SELECT * FROM activity_log", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

Userlogin.findById = (phone, password, result) => {
  
  sql.query(`SELECT userlogin.Userid, user.UserName, user.Phone, user.Roleid FROM userlogin INNER JOIN user ON userlogin.Userid = user.Userid WHERE user.Phone = ${phone} AND userlogin.Password = ${password} AND user.Statusid = 1;`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };



  module.exports = Userlogin;