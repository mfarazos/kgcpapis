module.exports = app => {
    const user = require("../controllers/recording.controllers.js");
    app.post("/CallRecordingAPI/getrecordings/", user.findrecording);
     
    
  
    
};