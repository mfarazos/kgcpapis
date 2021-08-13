module.exports = app => {
    const dashboarduser = require("../controllers/Dashboarduser.controllers.js");
    const tokenization = require("../models/Authentication.models.js");
    
    
     app.post("/CallRecordingAPI/insertnewDashboarduser/",dashboarduser.create);
     app.post("/CallRecordingAPI/forgotpassword/", dashboarduser.forgot);
     app.get("/CallRecordingAPI/showagentroles/" ,dashboarduser.findAllroles);
     app.post("/CallRecordingAPI/Sucessfullleadgraph/", dashboarduser.findsucessfullleadgraph);
     app.get("/CallRecordingAPI/showallDashboarduser/" , dashboarduser.findAll);
     app.post("/CallRecordingAPI/showgraph/" , dashboarduser.findgraph);
     app.post("/CallRecordingAPI/Dashboarduserlogin/" , dashboarduser.findOne);
     app.post("/CallRecordingAPI/Dashboarduserloginveryfy/",tokenization,dashboarduser.veryfy);
     app.put("/CallRecordingAPI/Dashboarduserupdatepassword/" , dashboarduser.update);
     app.put("/CallRecordingAPI/Changepassword/", dashboarduser.Change);
     app.post("/CallRecordingAPI/UpdateProfile/" , dashboarduser.Updateprofile);
     app.get("/CallRecordingAPI/showallTeams/", dashboarduser.findAllTeams);
     app.post("/CallRecordingAPI/AddNewTeam/" , dashboarduser.InsertTeam);
     app.post("/CallRecordingAPI/RemoveDashboardUser/" , dashboarduser.RemoveDashboarduser);
    
};