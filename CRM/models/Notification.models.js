const sql = require("./dbcrm.js");
const { json } = require('body-parser');
const request = require('request-promise');
const { getMaxListeners } = require("./dbcrm.js");
const FCM = require('fcm-node');
const Notification = function(notifications) {
    this.agentid = notifications.agentid;
    this.fcmtoken = notifications.fcmtoken;
    this.title = notifications.title;
    this.message = notifications.message;
    this.Datetime = notifications.Datetime;

};

Notification.createtoken = (notifications, result) => {
  if(notifications.agentid == undefined || notifications.fcmtoken == undefined){  
    result({ kind: "param_undefined" }, null);
    return;
  }
  sql.query("SELECT COUNT(*) AS user FROM token WHERE token.Dashboarduserid = ?",[notifications.agentid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var user =  (res[0].user);
    console.log(user);
    
    if(user === 0){
    sql.query("INSERT INTO token SET Dashboarduserid = ?, fcmtoken = ?",[notifications.agentid, notifications.fcmtoken], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created customer: ", { id: res.insertId, ...notifications });
          result(null, { id: res.insertId, ...notifications });
     });
    }
    else if(user === 1){
      sql.query("UPDATE token SET  fcmtoken = ? WHERE Dashboarduserid = ?",[notifications.fcmtoken, notifications.agentid], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created customer: ", { id: res.insertId, ...notifications });
            result(null, { id: res.insertId, ...notifications });
       });
    }
  });
    
    
};
Notification.createnotifications = (notifications, result) => {
  
    
    var serverKey = 'AAAAwoufAFQ:APA91bG2mxIXuGPM1x_3iQcYp2A4GxtoQGHp2WsybIxTKUO7uAoMIxw4JY06A1U5Z5msG1ZdH0o3DOpQTmqp9P1pN00wjYkz2glQ0OMvSIkfCk1N_h9BfnZn_d8J61GmT0t6V6mYcKvo'; //put your server key here
    var fcm = new FCM(serverKey);

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: notifications.fcmtoken, 
        // collapse_key: 'your_collapse_key',
        
        notification: {
            title: notifications.title, 
            body: notifications.message 
        },
        
        // data: {  //you can send only notification or only data(or include both)
        //     my_key: 'my value',
        //     my_another_key: 'my another value'
        // }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
            sql.query("INSERT INTO notification SET Dashboarduserid = ?, Title = ?, Body = ?",[notifications.agentid, notifications.title, notifications.message], (err, res) => {
                if (err) {
                  console.log("error: ", err);
                  result(err, null);
                  return;
                }
                console.log("created customer: ", { id: res.insertId, ...notifications });
                    result(null, { id: res.insertId, ...notifications });
               });
        }
    });

      
  };
Notification.getnotification = (agentid,result) => {
    sql.query(`SELECT * FROM notification WHERE notification.Dashboarduserid = ${agentid}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
     
      
      result(null, res);
        
    });
    
  };

 module.exports = Notification;