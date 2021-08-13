module.exports = app => {
    const callrecord = require("../controllers/callrecord.controllers.js");
  
    // Create a new Callrecord
    app.post("/CallRecordingAPI/callrecords/", callrecord.create);
    app.post("/CallRecordingAPI/GetcallrecordsData/", callrecord.findCalls);
    app.get("/CallRecordingAPI/Getcalltype/", callrecord.findcalltyp);
};
  