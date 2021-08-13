module.exports = app => {
    const user = require("../controllers/user.controllers.js");
  
   
     app.post("/CallRecordingAPI/insertuserinbound/", user.create);
     app.post("/CallRecordingAPI/insertuserlogin/", user.creater);
    app.post("/CallRecordingAPI/insertuserrecord/", user.insertrecord);
     app.put("/CallRecordingAPI/updateuserinformation/", user.updateduser);

     app.get("/CallRecordingAPI/showalluser/", user.findAll);
    
     app.get("/CallRecordingAPI/showallrecords/", user.gettingrecord);
     app.get("/CallRecordingAPI/showallstatus/", user.findStatus);
     app.get("/CallRecordingAPI/versioncode/", user.findVersion);

     app.get("/CallRecordingAPI/showallroles/", user.findRole);
     

  
    
};