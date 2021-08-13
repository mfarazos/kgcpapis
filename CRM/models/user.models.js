const sql = require("./dbcrm.js");
const { json } = require('body-parser');
const request = require('request-promise');
const { getMaxListeners } = require("./dbcrm.js");
var facebookuser = [];

// constructor
const User = function(user) {
  this.user_name = user.user_name;
  this.user_email = user.user_email;
  this.user_phone = user.user_phone;
  this.Leadsource = user.Leadsource;
   this.Father = user.Father;
   this.cnic = user.cnic;
   this.PassportNo = user.PassportNo;
   this.Dateofbirth = user.Dateofbirth;
   this.Profession = user.Profession;
   this.Organization = user.Organization;
   this.Addressoffice = user.Addressoffice;
   this.AddressResidence	 = user.AddressResidence;
   this.Teloffice	 = user.Teloffice;
   this.TelResidence	 = user.TelResidence	;
   this.Nationality = user.Nationality;
  this.Dashboarduserid = user.Dashboarduserid;
  this.user_id = user.user_id;
  this.Name = user.Name;
   this.Relation = user.Relation;
   this.nomineecnic = user.nomineecnic;
   this.Telephone = user.Telephone;
   this.Mobile = user.Mobile;
   this.Passport_no = user.Passport_no;
  };

User.create = (user, result) => {
  sql.query("SELECT COUNT(*) AS user FROM tbl_user WHERE tbl_user.user_phone = ?",[user.user_phone], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var usercount =  (res[0].user);
    
    if(usercount === 0){
    sql.query("INSERT INTO tbl_user SET user_name = ?, user_email = ?, user_phone = ?, Father_Spouse_Name = ?, CNIC = ?, PassportNo = ?,  Dateofbirth = ?, Profession = ?, Organization = ?, Address_office	= ?, Address_Residence	= ?, Tel_office = ?, Tel_Residence = ?, Nationality = ?", [user.user_name, user.user_email, user.user_phone,  user.Father, user.cnic, user.PassportNo, user.Dateofbirth, user.Profession, user.Organization, user.Addressoffice, user.AddressResidence, user.Teloffice, user.TelResidence, user.Nationality], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if(res.insertId !== undefined){
              sql.query("INSERT INTO tbl_lead SET user_id = ?, Dashboarduserid = ?, Leadsource = ?, status_id = 4", 
              [res.insertId, user.Dashboarduserid, user.Leadsource],
            (err, res1) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              
              result(null, { id: res1.insertId, ...user });
            });
    
        }
   
    
    });
   }
       else if(usercount > 0){
       
       result({ kind: "Exist" }, null);
    }
    
  });
};
User.createfacebookleads = (newUser, result) => {
  
  (async function() {
    try{
    const contacts =  await request({
    method: 'GET',
    url: 'https://api.hubapi.com/contacts/v1/lists/all/contacts/recent?hapikey=d71e609d-1c06-46c9-b809-6b3d8874d3fe&property=phone&property=firstname&property=lastname&property=email&count=100',
    json: true
    });
    const makecontacts = (contacts);
    for(var i = 0; i < makecontacts.contacts.length; i++){
    
    
    var fname = "";
    var lname = "";
    var email = "";
    var phone = "";
    try{
    if(typeof  (makecontacts.contacts[i].properties.firstname.value) !== undefined){
      fname = (makecontacts.contacts[i].properties.firstname.value);
     }
    }catch(e){
      fname = "N/A";
    }
     try{
     if(typeof  (makecontacts.contacts[i].properties.lastname.value) !== undefined){
      lastname = (makecontacts.contacts[i].properties.lastname.value);
     }
    }catch(e){
      lname = "";
    }
     
     try{
     if(typeof  (makecontacts.contacts[i].properties.phone.value) !== undefined){
      phone = (makecontacts.contacts[i].properties.phone.value);
      phone.trim();
     }
    }catch(e){
      phone = "N/A";
    }
     try{
     if(typeof  (makecontacts.contacts[i].properties.email.value) !== undefined){
      email = (makecontacts.contacts[i].properties.email.value);
     }
    }catch(e){
      email="N/A";
      }
     facebookuser.push({Name:(fname+" "+lname), Email: email, Phone: phone }); 
    
     
   }
      facebookuser.forEach(element => {
          var email = JSON.stringify(element.Email);
          var phone = JSON.stringify(element.Phone);
          var name = JSON.stringify(element.Name);
          
          
            if(element.Email === "N/A" && element.Phone === "N/A"){
              console.log("SORRY");
            }
            else if((element.Email !== "N/A" && element.Phone === "N/A") || (element.Email === "N/A" && element.Phone !== "N/A")){
              sql.query("SELECT COUNT(*) AS user FROM tbl_user WHERE tbl_user.user_email = ? && tbl_user.user_phone = ?",[element.Email,element.Phone],(err, res) => {
                  if (err) {
                  console.log("error: ", err);
                }
                      var user = (res[0].user);
                      debugger;
                      if(user === 0)
                      {
                          sql.query("INSERT INTO tbl_user SET tbl_user.user_name = ?, tbl_user.user_email = ?,  tbl_user.user_phone = ?", [element.Name,element.Email,element.Phone], (err, res1) => {
                            if (err) {
                              console.log("error: ", err);
                            }
                            if(res1.insertId !== undefined){
                                sql.query("INSERT INTO tbl_lead SET user_id = ?, Leadsource = 1, status_id = 4", 
                                    [res1.insertId],
                                  (err, res2) => {
                                    if (err) {
                                      console.log("error: ", err);
                                      }
                      
                                    console.log("SOMETHING na: ", { id: res2.insertId });
                                  
                                });
                            }


                          
                          
                          });
                    }
                      
              });
            }
            
            else if(element.Email !== "N/A" && element.Phone !== "N/A"){
              sql.query("SELECT COUNT(*) AS user FROM tbl_user WHERE tbl_user.user_email = ? && tbl_user.user_phone = ?",[element.Email,element.Phone],(err, res) => {
                  if (err) {
                  console.log("error: ", err);
                }
                    var user = (res[0].user);
                    debugger;
                    if(user === 0){
                      sql.query("INSERT INTO tbl_user SET tbl_user.user_name = ?, tbl_user.user_email = ? , tbl_user.user_phone = ?", [element.Name,element.Email,element.Phone], (err, res1) => {
                          if (err) {
                            console.log("error: ", err);
                          }
                        if(res1.insertId !== undefined){
                            sql.query("INSERT INTO tbl_lead SET user_id = ?, Leadsource = 1, status_id = 4", 
                                [res1.insertId],
                                (err, res2) => {
                                  if (err) {
                                    console.log("error: ", err);
                                  }
                    
                                  console.log("Perfectdata: ", { id: res2.insertId });
                            });
                        }

                        
                      });
                    }
                });
            }

          
                              
      }
      );
                          
     result(null,"done")
  }
     catch(e){
     console.log('Error', e);
 }
    })();
    
};


User.getAll = (createddate,result) => {
    sql.query("SELECT * FROM tbl_user", (err, res) => {
     
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      
    var arr = [];
    var dataholder = res;
    
    if (createddate == null) {
       arr = dataholder;
       result(null, arr);
     }
     else{
      //for id 
      var calldate = new Date(createddate);
      if(createddate !== null){
        dataholder.forEach(element => {
          var responsedate = new Date(element.CreatedDatetime);
          if((calldate.getMonth() + 1) === (responsedate.getMonth() + 1) && (calldate.getFullYear()) === (responsedate.getFullYear()) && (calldate.getDate()) === (responsedate.getDate())){
          
            arr.push(element);
          }
        });
      } else if(createddate === null){
       
        console.log("id is undefined");
      }
  
      console.log("customers: ", res);
      result(null, arr);
    }
  });
};

User.updateuser = (user, result) => {
  const ndate = new Date();
  sql.query("UPDATE tbl_user SET user_name = ?, user_email = ?, user_phone = ?, Father_Spouse_Name = ?, CNIC = ?, PassportNo = ?,  Dateofbirth = ?, Profession = ?, Organization = ?, Address_office	= ?, Address_Residence	= ?, Tel_office = ?, Tel_Residence = ?, Nationality = ?, Editon = ? WHERE user_id = ?",
  [user.user_name, user.user_email, user.user_phone,  user.Father, user.cnic, user.PassportNo, user.Dateofbirth, user.Profession, user.Organization, user.Addressoffice, user.AddressResidence, user.Teloffice, user.TelResidence, user.Nationality, ndate, user.user_id],
  (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", user );
      result(null, user );
    }
  );
};

User.InsertNomineedata = (user, result) => {
 sql.query("INSERT INTO nominee SET Name = ?, Relation = ?, CNIC = ?, Telephone = ?, Mobile = ?, Passport_no = ?, user_id = ? ", 
    [user.Name, user.Relation, user.nomineecnic,  user.Telephone, user.Mobile, user.Passport_no, user.user_id],
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...user });
    result(null, { id: res.insertId, ...user });
  });
};

module.exports = User;