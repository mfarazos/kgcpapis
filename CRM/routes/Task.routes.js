module.exports = app => {
    const user = require("../controllers/Task.controllers.js");
    const tokenization = require("../models/Authentication.models.js");
    
     app.post("/CallRecordingAPI/insertnewlead/" , user.create);
     app.post("/CallRecordingAPI/insertorderlog/" , user.createorderlog);
     app.post("/CallRecordingAPI/showallleads/" , user.findAll);
     app.post("/CallRecordingAPI/showorderlog/" , user.findorderlog);
     app.post("/CallRecordingAPI/showallorderlog/" , user.findallorderlog);
     app.post("/CallRecordingAPI/showstats/" , user.findAllleads);
     app.post("/CallRecordingAPI/Taskrecord/" , user.findtaskrecord);
     app.post("/CallRecordingAPI/Clientdetails/", user.findUserdetail);
     app.post("/CallRecordingAPI/meetingnotifications/", user.findmeetingnotification);
     app.get("/CallRecordingAPI/ShowAllAgent/" , user.findAllAgent);
     app.get("/CallRecordingAPI/ShowAllOrderstatus/" , user.findAllOrderstatus);
     app.get("/CallRecordingAPI/Showcalloutcomestatus/" , user.findCallOutcomestatus);
     app.get("/CallRecordingAPI/ShowNoofcompaigns/", user.findCompaigncount);
     app.get("/CallRecordingAPI/Showcampaign/" , user.findAllCompaign);
     app.put("/CallRecordingAPI/AssigntoAgent/" , user.update);
     app.put("/CallRecordingAPI/UpdateLeadstatus/" , user.upgradeleadstatus);
     app.put("/CallRecordingAPI/Updateuserstatus/" , user.upgradeuserstatus);

  
    
};