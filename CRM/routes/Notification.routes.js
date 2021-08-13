module.exports = app => {
    const user = require("../controllers/Notification.controllers.js");
    const tokenization = require("../models/Authentication.models.js");
    
     app.post("/CallRecordingAPI/sendnotification/" , user.SendNotification);
     app.post("/CallRecordingAPI/savefcmtoken/" , user.inserttoken);
     app.post("/CallRecordingAPI/getnotification/" , user.findallnotifications);
     
    
  
    
};