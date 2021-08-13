const sql = require("./dbcrm.js");
const Request = function(request) {
    
    this.affectedtype = request.affectedtype;
    this.requestnature = request.requestnature;
    this.requestedby = request.requestedby;
    this.remarks = request.remarks;
    this.request_status = request.request_status;
    };

  Request.create = (newRequest, result) => {
    sql.query("INSERT INTO request SET ?", newRequest, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Request: ", { id: res.insertId, ...newRequest });
      result(null, { id: res.insertId, ...newRequest });
    });
  };
  
  Request.getAll = result => {
      sql.query("SELECT * FROM request", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("Request: ", res);
        result(null, res);
      });
    };

module.exports = Request;