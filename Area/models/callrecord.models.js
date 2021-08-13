const sql = require("./db.js");

// constructor
const Callrecord = function (callrecord) {
  this.Userid = callrecord.Userid;
  this.VoiceLink = callrecord.VoiceLink;
  this.Typeid = callrecord.Typeid;
  this.Statusid = callrecord.Statusid;
  this.ClientNumber = callrecord.ClientNumber;
};

Callrecord.create = (newCallrecord, result) => {
  const date =  (newCallrecord.VoiceLink);
  const datee = date.split('-');
  const splitetime = datee[3].split(' ');
  var finaldate = (splitetime[0]+"-"+datee[2]+"-"+datee[1]+" "+splitetime[1]);
  
  sql.query("INSERT INTO calldata SET Userid = ?, VoiceLink = ?, Typeid = ?, Statusid = ?, ClientNumber = ?, recordtime = ? ",
   [newCallrecord.Userid, newCallrecord.VoiceLink,newCallrecord.Typeid,newCallrecord.Statusid,newCallrecord.ClientNumber,finaldate],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCallrecord });
    result(null, { id: res.insertId, ...newCallrecord });
  });
};




Callrecord.getAll = (id, caltyp, phone, searvhdate, result) => {
  console.log("Param id: " , id);
   sql.query("SELECT calldata.Callid, calldata.recordtime, calldata.Userid, calldata.VoiceLink, calldata.Typeid, calldata.DateTime, calldata.Statusid, calldata.ClientNumber, user.UserName, user.Phone, calltype.Typename, status.Status FROM (((calldata INNER JOIN user ON calldata.Userid = user.Userid) INNER JOIN calltype ON calldata.Typeid = calltype.Typeid) INNER JOIN status ON calldata.Statusid = status.Statusid) WHERE calldata.Statusid = 1 && user.Statusid = 1;", (err, res) => {
    
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var arr = [];
    debugger;
    var dataholder = res;
    
    if (id == null && caltyp == null && phone == null && searvhdate == null) {
      arr = dataholder;
       result(null, arr);
     }
     // with param 
     else{
      //for id 
      if(id !== null){
        dataholder.forEach(element => {
          if(element.Userid === id){
            arr.push(element);
          }
        });
      } else if(id === null){
        arr = dataholder;
        console.log("id is undefined");
      }
//for calltype
if(caltyp !== null){
  dataholder = [];
  for (var i = 0; i < arr.length; i++){
    if(arr[i].Typeid === caltyp){
      dataholder.push(arr[i])
    }
    
  }
  arr = [];
  arr = dataholder;
} else if(caltyp === null){
  console.log("calltype is undefined");
}
//for phone
if(phone !== null){
  dataholder = [];
  for (var i = 0; i < arr.length; i++){
       if(arr[i].ClientNumber == phone){
        dataholder.push(arr[i])
      }
    }
    arr = [];
    arr = dataholder;
} else if(phone === null){
  console.log("phone is undefined");
}
// FOR DATE 
//var calldate = new Date(searvhdate);



if(searvhdate !== null){
  var calldate = searvhdate.split('-');
  console.log(calldate);
  dataholder = [];
  for (var i = 0; i < arr.length; i++){
    
    
    const serverdate =(arr[i].recordtime);
    const responsedate = serverdate.split('-');
    const year = responsedate[2].split(' ');
    console.log(responsedate);
    console.log(year[0]);
    
      
    if((calldate[0]) === (responsedate[0]) && (calldate[1]) === (responsedate[1]) && (calldate[2]) === (year[0])){
        dataholder.push(arr[i])
        console.log(arr[i]);
      }
    }
    arr = [];
    arr = dataholder;
} else if(searvhdate === null){
  console.log("Date is undefined");
}
     console.log("count: ", arr);
      result(null, arr);
    }
  });
};





Callrecord.getAllincoming = result => {
  sql.query("SELECT * FROM calltype", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("calltype: ", res);
    result(null, res);
  });
};

module.exports = Callrecord;