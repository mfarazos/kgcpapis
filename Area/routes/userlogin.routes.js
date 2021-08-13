module.exports = app => {
        
    const userlogin = require("../controllers/userlogin.controllers.js");
      
        // Create a new Callrecord
    app.post("/CallRecordingAPI/userlogin/", userlogin.findOne);

    app.get("/CallRecordingAPI/userloginactivilog/", userlogin.findactivitylog);
      
    app.post("/CallRecordingAPI/activitylog/", userlogin.activitylog);
        
};