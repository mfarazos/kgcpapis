const sql = require("./db.js");

// constructor
const User = function(user) {
  this.UserName = user.UserName;
  this.Email = user.Email;
  this.Phone = user.Phone;
  this.CNIC = user.CNIC;
  this.Roleid = user.Roleid;
  this.Statusid = user.Statusid;
  this.Userid = user.Userid;
  this.Password = user.Password;
  this.Phone_number = user.Phone_number;
  this.Deviceid = user.Deviceid;
  this.Description = user.Description;
  
};

User.create = (user, result) => {

    sql.query(`SELECT COUNT(*) as val FROM user WHERE user.Phone = ${user.Phone} && user.Statusid = 1;`, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
            var val =  (res[0].val);
            if(val === 0){
            sql.query("INSERT INTO user SET  user.UserName = ?, user.Email = ?, user.Phone = ?, user.CNIC = ?, user.Roleid = ?, user.Statusid = ?",
              [user.UserName, user.Email, user.Phone, user.CNIC, user.Roleid, user.Statusid],
              (err, res1) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
                console.log("created customer: ", { id: res1.insertId, ...user });
                result(null, { id: res1.insertId, ...user });
                });
            }
            else{
              result({ kind: "Email_Exist" }, null);
              return;
            }
   
     });
    
};

User.creater = (user, result) => {
  sql.query("INSERT INTO userlogin SET Userid = ?, Password = ?, Statusid = ?",
  [user.Userid, user.Password, user.Statusid], 
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


User.getAll = result => {
    sql.query("SELECT * FROM user WHERE user.Statusid = 1", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };



  User.getStatus = result => {
    sql.query("SELECT * FROM status", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  
  User.getVersion = result => {
    sql.query("SELECT * FROM Version", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

  User.getRoles = result => {
    sql.query("SELECT * FROM role", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  
  User.getRecord = result => {
    sql.query("SELECT * FROM Record", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };


  // const Us = function(us) {
  //   this.UserName = us.UserName;
  //   this.Email = us.Email;
  //   this.Phone = us.Phone;
  //   this.CNIC = us.CNIC;
  //   this.Roleid = us.Roleid;
  //   this.Statusid = us.Statusid;
  //   this.Password = us.Password;
  // };
  User.UPDATE = (Userid, user, result) => {
    sql.query(
      "UPDATE user, userlogin  SET user.UserName = ?, userlogin.Password = ?, user.Email = ?, user.Phone = ?, user.CNIC = ?, user.Roleid = ?, user.Statusid = ?  WHERE user.Userid = userlogin.Userid AND user.Userid = ?",
      [user.UserName, user.Password, user.Email, user.Phone, user.CNIC, user.Roleid, user.Statusid, Userid],
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
  
        console.log("updated customer: ", { Userid: Userid, ...user });
        result(null, { Userid: Userid, ...user });
      }
    );
  };

User.Record = (user, result) => {
    sql.query("INSERT INTO Record SET Phone_number = ?, Deviceid = ?, Description = ?",
    [user.Phone_number, user.Deviceid, user.Description], 
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

module.exports = User;

