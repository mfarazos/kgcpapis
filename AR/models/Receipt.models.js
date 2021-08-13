const sql = require("./dbar.js");
const jwt = require("jsonwebtoken");
const { getMaxListeners } = require("./dbar.js");
const { json } = require("express");
const request = require('request-promise');
const FCM = require('fcm-node');

// constructor
const User = function(user) {
  this.salutation = user.salutation;
  this.ClientName = user.ClientName;
  this.Relation = user.Relation;
  this.FamailyName = user.FamailyName;
  this.cnic = user.cnic;
  this.PassportNo = user.PassportNo;
  this.EmailId = user.EmailId;
  this.PhoneNumber = user.PhoneNumber;
  this.Status_id = user.Status_id;
  this.Date = user.Date;
  this.ClientId = user.ClientId;
  this.CurrencyTypeId = user.CurrencyTypeId;
  this.CurrencyTypeDescription = user.CurrencyTypeDescription;
  this.Amount = user.Amount;
  this.PaymentThroughId = user.PaymentThroughId;
  this.PaymentThroughDescription = user.PaymentThroughDescription;
  this.Plot_UnitNo = user.Plot_UnitNo;
  this.InstallmentNo = user.InstallmentNo;
  this.Through = user.Through;
  this.PaymentTypeid = user.PaymentTypeid;
  this.Remarks = user.Remarks;
  this.Agentid = user.Agentid;
  this.Confirmation_Status = user.Confirmation_Status;
  this.email = user.email;
  this.password = user.password;
  this.fcmtoken = user.fcmtoken;
  this.PaymentReceiptNo = user.PaymentReceiptNo;
  this.title = user.title;
  this.message = user.message;
  this.Filenumber = user.Filenumber;
  this.role_id = user.role_id;
  this.name = user.name;
  this.Description = user.Description;
  
};


User.createuser = (user, result) => {
  
  sql.query("SELECT COUNT(*) AS user FROM tbl_dashboard WHERE tbl_dashboard.email = ?",[user.email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var usercount =  (res[0].user);
    console.log(usercount);
    if(usercount === 0){
          sql.query("INSERT INTO tbl_dashboard SET  email = ?, password = ?, name = ?, phoneNo = ?, Description = ?,  role_id = ?, status_id = 101", [user.email, user.password, user.name, user.PhoneNumber, user.Description, user.role_id], (err, res1) => {
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
          var arr = [{Email:"Email already Exist"}];
          console.log(res);
          result(null, arr);
      }
      
    });
};


User.CreateReceipt = (user, result) => {
  
  sql.query("SELECT COUNT(*) AS user, clientdetails.ClientId FROM clientdetails WHERE clientdetails.CNIC = ?",[user.cnic], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let usercount =  (res[0].user);
    console.log(user);
    if(usercount === 0){
        console.log(user.salutation);
        sql.query("INSERT INTO clientdetails SET salutation = ?, ClientName = ?, Relation = ?, FamailyName = ?, CNIC = ?, PassportNo = ?, EmailId = ?, PhoneNumber = ?,  Status_id = ?", 
        [user.salutation, user.ClientName ,user.Relation, user.FamailyName, user.cnic, user.PassportNo, user.EmailId, user.PhoneNumber,  user.Status_id ],
          (err, res1) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
        user.ClientId = (res1.insertId);
        sql.query("INSERT INTO paymentreceipt SET ClientId = ?, CurrencyTypeId = ?, CurrencyTypeDescription = ?, Amount = ?, PaymentThroughId = ?, PaymentThroughDescription = ?, Dated = ?, Plot_UnitNo = ?, InstallmentNo = ?, Through = ?, PaymentTypeid = ?, Remarks = ?, Agentid = ?, Confirmation_Status = ?, Status_Id = ?", 
        [user.ClientId,user.CurrencyTypeId,user.CurrencyTypeDescription,user.Amount,user.PaymentThroughId,user.PaymentThroughDescription,user.Date,user.Plot_UnitNo,user.InstallmentNo,user.Through,user.PaymentTypeid,user.Remarks,user.Agentid,user.Confirmation_Status,user.Status_id], 
        (err, res2) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }


          console.log("created customer: ", { id: res2.insertId, ...user });
          result(null, { id: res2.insertId, ...user });
            });

          });
      }
      else if(usercount > 0){
        
        sql.query("INSERT INTO paymentreceipt SET ClientId = ?, CurrencyTypeId = ?, CurrencyTypeDescription = ?, Amount = ?, PaymentThroughId = ?, PaymentThroughDescription = ?, Dated = ?, Plot_UnitNo = ?, InstallmentNo = ?, Through = ?, PaymentTypeid = ?, Remarks = ?, Agentid = ?, Confirmation_Status = ?, Status_Id = ?", 
        [user.ClientId,user.CurrencyTypeId,user.CurrencyTypeDescription,user.Amount,user.PaymentThroughId,user.PaymentThroughDescription,user.Date,user.Plot_UnitNo,user.InstallmentNo,user.Through,user.PaymentTypeid,user.Remarks,user.Agentid,user.Confirmation_Status,user.Status_id], 
        (err, res3) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }


        console.log("created customer: ", { id: res3.insertId, ...user });
        result(null, { id: res3.insertId, ...user });
        });
      }
      
    });
};



User.veryfytoken = (arr,result) => {
    result(null,arr);
};

User.findById = (user,result) => {
     
    if(user.email === undefined || user.password === undefined){  
      result({ kind: "param_undefined" }, null);
      return;
    }
    let email = JSON.stringify(user.email);
    let password = JSON.stringify(user.password);
    
   sql.query(`SELECT * FROM tbl_dashboard WHERE tbl_dashboard.email = ${email} && tbl_dashboard.password = ${password};`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.length) {
        console.log(user.fcmtoken);
        sql.query("UPDATE tbl_dashboard SET fcmtoken = ? WHERE email = ?",
        [user.fcmtoken, user.email],
        (err, res1) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res1.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_update" }, null);
          return;
        }
        //var ntoken;
        var userinfo = ({FCM: user.fcmtoken, ...res[0]});
        jwt.sign({userinfo}, 'secretkey', (err,token) =>{
          console.log(userinfo)
          token
          let arr = [];
          arr.push({token: token})
          result(null, arr);
          console.log("found customer: ", res[0]);
          return;
        });
      });
        
    }
    else{
      result({ kind: "not_foundloginuser" }, null);
    }
  
      // not found Customer with the id
      
    });

};

User.UpdatePaymentStatus = (user, result) => {
    sql.query("UPDATE paymentreceipt SET Confirmation_Status = ? WHERE PaymentReceiptNo = ? ",
        [user.Confirmation_Status, user.PaymentReceiptNo],
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
      });
};

User.getAllPaymentStatus = result => {
    sql.query("SELECT * FROM tbl_status WHERE tbl_status.StatusTypeid = 102", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

User.getAllCurrencyType = result => {
    sql.query("SELECT * FROM currencytype", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

User.getAllPaymentType = result => {
    sql.query("SELECT * FROM paymenttype", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

User.getAllPaymentThrough = result => {
    sql.query("SELECT * FROM paymentthrough", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };

User.getAllClient = result => {
    sql.query("SELECT clientdetails.salutation,clientdetails.ClientName,if(clientdetails.Relation is null, 'N/A',clientdetails.Relation) AS Relation, if(clientdetails.FamailyName is null, 'N/A',clientdetails.FamailyName) AS FamailyName,clientdetails.CNIC, if(clientdetails.PassportNo is null, 'N/A',clientdetails.PassportNo) AS PassportNo, if(clientdetails.PhoneNumber is null, 'N/A',clientdetails.PhoneNumber) AS PhoneNumber, if(clientdetails.EmailId is null, 'N/A',clientdetails.EmailId) AS EmailId, paymentreceipt.PaymentReceiptNo,paymentreceipt.ClientId,paymentreceipt.Datetime,paymentreceipt.CurrencyTypeId,paymentreceipt.CurrencyTypeDescription, paymentreceipt.Amount,paymentreceipt.PaymentThroughId,paymentreceipt.PaymentThroughDescription, if(paymentreceipt.Dated is null, 'N/A',paymentreceipt.Dated) AS Dated,paymentreceipt.Plot_UnitNo, paymentreceipt.InstallmentNo,paymentreceipt.Through,paymentreceipt.PaymentTypeid, if(paymentreceipt.Remarks is null, 'N/A',paymentreceipt.Remarks) AS Remarks, if(paymentreceipt.FileNumber is null, 'N/A',paymentreceipt.FileNumber) AS FileNumber, if(paymentreceipt.Editby is null, 'N/A',paymentreceipt.Editby) AS Editby,paymentreceipt.Agentid,paymentreceipt.Status_Id, currencytype.CurrencyTypeName, paymentthrough.PaymentthroughName, paymenttype.PaymentTypeName, tbl_status.status_name FROM clientdetails INNER JOIN paymentreceipt ON clientdetails.ClientId = paymentreceipt.ClientId INNER JOIN currencytype ON paymentreceipt.CurrencyTypeId = currencytype.CurrencyTypeId INNER JOIN paymentthrough ON paymentreceipt.PaymentThroughId = paymentthrough.PaymentThroughId INNER JOIN paymenttype ON paymentreceipt.PaymentTypeid = paymenttype.PaymentTypeId INNER JOIN tbl_status ON paymentreceipt.Confirmation_Status = tbl_status.status_id GROUP BY paymentreceipt.ClientId", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };





User.createnotifications = (user, result) => {
  
    
    var serverKey = 'AAAA44t4Kmk:APA91bGnEJ0vXgCHq3odWqQUU1syS6WY56809JpqhaZqDi1SS2jqIlD_clrmXiUaq3VGHDf7Kg4MdyFHvaTO9vyXOKV7Iw7iv_IJiwPZ3ZJ53jflIYT0QSM-8OkN0OGsQuEOzN-vTz9p'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: user.fcmtoken, 
        // collapse_key: 'your_collapse_key',
        
        notification: {
            title: user.title, 
            body: user.message 
        },
        
        
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
            result(err, null);
            return;
        } else {
            console.log("Successfully sent with response: ", response);
            sql.query("INSERT INTO notification SET Dashboarduserid = ?, ReceiptNo = ?, Status = ?, Title = ?, Body = ?",[user.Agentid, user.PaymentReceiptNo, user.Confirmation_Status, user.title, user.message], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
                console.log("created customer: ", { id: res.insertId, ...user });
                    result(null, { id: res.insertId, ...user });
               });
        }
    });

      
  };

User.getnotification = (agentid,result) => {
    sql.query(`SELECT * FROM notification WHERE notification.Dashboarduserid = ${agentid}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
     
      
      result(null, res);
        
    });
    
};

User.getClienthistory = (user,result) => {
  sql.query("SELECT clientdetails.salutation,clientdetails.ClientName,if(clientdetails.Relation is null, 'N/A',clientdetails.Relation) AS Relation, if(clientdetails.FamailyName is null, 'N/A',clientdetails.FamailyName) AS FamailyName,clientdetails.CNIC, if(clientdetails.PassportNo is null, 'N/A',clientdetails.PassportNo) AS PassportNo, if(clientdetails.PhoneNumber is null, 'N/A',clientdetails.PhoneNumber) AS PhoneNumber, if(clientdetails.EmailId is null, 'N/A',clientdetails.EmailId) AS EmailId, paymentreceipt.PaymentReceiptNo,paymentreceipt.ClientId,paymentreceipt.Datetime,paymentreceipt.CurrencyTypeId,paymentreceipt.CurrencyTypeDescription, paymentreceipt.Amount,paymentreceipt.PaymentThroughId,paymentreceipt.PaymentThroughDescription, if(paymentreceipt.Dated is null, 'N/A',paymentreceipt.Dated) AS Dated,paymentreceipt.Plot_UnitNo, paymentreceipt.InstallmentNo,paymentreceipt.Through,paymentreceipt.PaymentTypeid, if(paymentreceipt.Remarks is null, 'N/A',paymentreceipt.Remarks) AS Remarks,if(paymentreceipt.FileNumber is null, 'N/A',paymentreceipt.FileNumber) AS FileNumber, if(paymentreceipt.Editby is null, 'N/A',paymentreceipt.Editby) AS Editby,paymentreceipt.Agentid,paymentreceipt.Status_Id, currencytype.CurrencyTypeName, paymentthrough.PaymentthroughName, paymenttype.PaymentTypeName, tbl_status.status_name FROM clientdetails INNER JOIN paymentreceipt ON clientdetails.ClientId = paymentreceipt.ClientId INNER JOIN currencytype ON paymentreceipt.CurrencyTypeId = currencytype.CurrencyTypeId INNER JOIN paymentthrough ON paymentreceipt.PaymentThroughId = paymentthrough.PaymentThroughId INNER JOIN paymenttype ON paymentreceipt.PaymentTypeid = paymenttype.PaymentTypeId INNER JOIN tbl_status ON paymentreceipt.Confirmation_Status = tbl_status.status_id WHERE paymentreceipt.ClientId = ?",[user.ClientId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

User.UpdatePaymentFileNumber = (user, result) => {
  sql.query("UPDATE paymentreceipt SET FileNumber = ? WHERE PaymentReceiptNo = ? ",
      [user.Filenumber, user.PaymentReceiptNo],
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
    });
};


User.UpdatePaymentReceipt = (user, result) => {
  let editdate = new Date();
  sql.query("UPDATE clientdetails, paymentreceipt SET clientdetails.salutation = ?, clientdetails.ClientName = ?, clientdetails.Relation = ?,clientdetails.FamailyName = ?, clientdetails.CNIC = ?, clientdetails.PassportNo = ?, clientdetails.EmailId = ?, clientdetails.PhoneNumber = ?, paymentreceipt.CurrencyTypeId = ?, paymentreceipt.CurrencyTypeDescription = ?, paymentreceipt.Amount = ?, paymentreceipt.PaymentThroughId = ?, paymentreceipt.PaymentThroughDescription = ?, paymentreceipt.Dated = ?, paymentreceipt.Plot_UnitNo = ?, paymentreceipt.InstallmentNo = ?, paymentreceipt.Through = ?, paymentreceipt.PaymentTypeid = ?, paymentreceipt.Remarks = ?, paymentreceipt.FileNumber = ?, paymentreceipt.Agentid = ?, paymentreceipt.Editby = ?, paymentreceipt.Confirmation_Status = ? WHERE paymentreceipt.PaymentReceiptNo = ? AND clientdetails.ClientId = ?",
      [user.salutation, user.ClientName ,user.Relation, user.FamailyName, user.cnic, user.PassportNo, user.EmailId, user.PhoneNumber, user.CurrencyTypeId,user.CurrencyTypeDescription,user.Amount,user.PaymentThroughId,user.PaymentThroughDescription,user.Date,user.Plot_UnitNo,user.InstallmentNo,user.Through,user.PaymentTypeid, user.Remarks, user.Filenumber, user.Agentid,editdate, user.Confirmation_Status, user.PaymentReceiptNo, user.ClientId],
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
    });
};
  
module.exports = User;