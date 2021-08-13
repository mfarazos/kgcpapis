const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
// var corsOptions = {
//   origin: 'http://192.168.18.206:3000',
//   optionsSuccessStatus: 200, // For legacy browser support
//   methods: "GET, PUT, POST"
// }


app.use(function(req, res, next) {
 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});
 app.use(cors());
 
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to KGC app" });
    console.log(new Date().toString());
  });

require("./Area/routes/callrecord.routes.js")(app);
require("./Area/routes/userlogin.routes.js")(app);
require("./Area/routes/user.routes.js")(app);
require("./Area/routes/recording.routes.js")(app);
require("./CRM/routes/user.routes.js")(app);
require("./CRM/routes/Dashboarduser.routes.js")(app);
require("./CRM/routes/Task.routes.js")(app);
require("./CRM/routes/Notification.routes.js")(app);
require("./CRM/routes/HouseInventry.routes.js")(app);
require("./AR/routes/Receipt.routes.js")(app);



const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
  // const nDate = new Date().toLocaleString('en-US', {
  //   timeZone: 'Asia/Karachi'
  // });
  
  // console.log(nDate);
  
  
  


});

