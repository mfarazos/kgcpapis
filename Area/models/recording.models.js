var fs = require('fs');
const ftp = require('basic-ftp');
// constructor
const User = function(user) {
  this.Base64String = user.Base64String;
  this.filename = user.filename;
};





User.getrecording = (user, result) => {

    if(user.Base64String !== null || user.Base64String !== undefined){
        result(null,"Done");
    }
    (async function() {
        fs.writeFile(`Soundfiles/${user.filename}`,user.Base64String,{encoding: 'base64'},function(err){
            if(err){
                console.log(err);
            }
            
                console.log('file created');
        })
        const client = new ftp.Client()
        client.ftp.verbose = true
        try {
            await client.access({
                host: "199.250.202.199",
                user: "callrecordings@squarepro.net",
                password: "Pakistan786&",
                
            })
            
            await client.uploadFrom(`Soundfiles/${user.filename}`, `${user.filename}`)
            //await client.downloadTo("README_COPY.md", "README_FTP.md")
            try {
                fs.unlinkSync(`Soundfiles/${user.filename}`)
                //file removed
                
              } catch(err) {
                console.error(err);
              }
        }
        catch(err) {
            console.log("not send ftp");
            
        }
          client.close()
         
        
    })();
    
    
    
};
module.exports = User;
  