module.exports = app => {
    const user = require("../controllers/HouseInventry.controllers.js");
    //const tokenization = require("../models/Authentication.models.js");
    
     app.get("/CallRecordingAPI/Projects/", user.findprojects);
     app.get("/CallRecordingAPI/housestatus/", user.findhousestatus);
     app.get("/CallRecordingAPI/Direction/", user.finddirection);
     app.get("/CallRecordingAPI/Position/", user.findposition);
     app.get("/CallRecordingAPI/Plottype/", user.findplottype);
     app.get("/CallRecordingAPI/Plotcategory/", user.findplotcatrgory);
     app.post("/CallRecordingAPI/Sectors/", user.findSectors);
     app.post("/CallRecordingAPI/Streets/", user.findStreets);
     app.post("/CallRecordingAPI/Plots/", user.findPlots);
     app.post("/CallRecordingAPI/userplotinfo/", user.finduserplotnfo);
     app.put("/CallRecordingAPI/sellplot/", user.sellplot);

     
    
  
    
};