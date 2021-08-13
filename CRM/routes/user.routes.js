module.exports = app => {
    const user = require("../controllers/user.controllers.js");
    const tokenization = require("../models/Authentication.models.js");
    
     app.post("/CallRecordingAPI/insertnewuser/" ,  user.create);
     app.post("/CallRecordingAPI/insertfacebookleads/" , user.createfacebook);
     app.post("/CallRecordingAPI/insertnominee/",  user.InsertNominee);
     app.get("/CallRecordingAPI/showallleaduser/" , user.findAll);
     app.put("/CallRecordingAPI/Updateuser/" , user.upgradeuser);

    
  
    
};