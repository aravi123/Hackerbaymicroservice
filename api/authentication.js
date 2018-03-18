
/**
 * Perform generation and validation of JWT token for a valid user.
 * As per the test statement it accepts any username/password pair.
 */


const jwt = require('jsonwebtoken'); //done for testing purpose

let login = (username,password)=>{

    return new Promise((resolve,reject)=>{

        jwt.sign({username:username},'secret',{expiresIn:60*60},(err,token)=>{
            if (!err){
                resolve(token);
            }
            else{
                reject(err);
            }
        });

    });

};

let validate = (token)=>{

    return new Promise((resolve,reject)=>{

        jwt.verify(token,'secret',(err,decoded)=>{
            if (!err){
                sucesslog.info("Authentication"+decoded);
                resolve({status:true});
            }
            else{
                reject(err);
            }
        });
    });
};

module.exports={
    login:login,
    validate:validate
};