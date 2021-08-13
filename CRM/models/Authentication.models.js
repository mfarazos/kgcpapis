const jwt = require("jsonwebtoken");

                  
      const user = function (req, res, next){
                                
                    const bearerHeader = req.headers['authorization'];
                    if(bearerHeader !== undefined && bearerHeader !== null){
                      const bearer = bearerHeader.split(' ');
                      const bearertoken = bearer[1];
                      req.token = bearertoken;
                      jwt.verify(req.token, 'secretkey', (err, authdata) =>{
                        if(err){
                          
                            //req.eer = err;
                            res.status(200).send({
                              message: err.message,
                              status: false,
                              httpstatus: 403,
                          });
                            return;
                        }
                        else{
                            req.arr = authdata;
                            next();
                        }
                      });
                      
                    }
                    else{
                      res.status(200).send({
                      response:null,
                      status: false,
                      httpstatus: 403,
                      message: `Header Can't found.`
                      });
                    }
            }
            module.exports = user;