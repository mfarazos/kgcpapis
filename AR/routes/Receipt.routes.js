module.exports = app => {
    const user = require("../controllers/Receipt.controllers.js");
    const tokenization = require("../models/Authentication.models.js");
    
    
     app.get("/CallRecordingAPI/CurrencyType/", tokenization , user.findCurrencyType);
     app.get("/CallRecordingAPI/PaymentThrough/", tokenization , user.findPaymentThrough);
     app.get("/CallRecordingAPI/PaymentType/", tokenization , user.findPaymentType);
     app.get("/CallRecordingAPI/PaymentStatus/", tokenization, user.findallstatus);
     app.get("/CallRecordingAPI/GetAllClients/", tokenization, user.findallclients);
     app.post("/CallRecordingAPI/loginoperator/", user.findOne);
     app.post("/CallRecordingAPI/CreateReceipt/", tokenization, user.CreateClient);
     app.post("/CallRecordingAPI/Accountappverify/",tokenization,user.veryfy);
     app.post("/CallRecordingAPI/Clienthistory/",tokenization,user.findclientshistory);
     app.put("/CallRecordingAPI/UpdatePaymentStatus/",tokenization,user.UpgradePaymentStatus);
     app.post("/CallRecordingAPI/UpdateNotify/",tokenization,user.SendNotification);
     app.put("/CallRecordingAPI/UpdatePaymentFileNumber/",tokenization,user.UpgradePaymentFilenumber);
     app.put("/CallRecordingAPI/UpdatePaymentReceipt/",tokenization,user.UpgradePaymentReceipt);
     app.post("/CallRecordingAPI/Createuser/",user.CreateNewuser);
     

  
    
};