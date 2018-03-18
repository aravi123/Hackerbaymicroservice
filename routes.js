
const app = express.Router();
const auth = require('./api/authentication.js');
const jsonpatches = require('./api/apply-patch.js');
const thumbnail = require('./api/thumbnail.js');



/**
 * URL: http://localhost:3000/api/login
 * Content-Type: application/x-www-form-urlencoded
 * Params:
 *  username: string
 *  password: password
 */


app.post('/login',(req,res)=>{
    if(req.body.username && req.body.password){
        auth.login(req.body.username,req.body.password).then((token)=>{
            sucesslog.info("Logged in\t"+token);
            res.send({status:true,token:token});
        }).catch((err)=>{
            errorlog.error("Error in /login"+err);
            res.send({status:false});
        })
    }
    else{
        errorlog.error("Incomplete details" + JSON.stringify(req.body));
        res.send({status:false});
    }
});

/**
 * URL: http://localhost:3000/api/patch
 * Content-Type: JSON (application/json)
 * Params:
 *  json: json object
 *  patch: json patch object
 *  token: token
 */

app.post('/patch',(req,res)=>{

    if(req.body.token && req.body.json && req.body.patch){
        auth.validate(req.body.token).then(()=>{
            sucesslog.info("Authenticated at /patch");
            jsonpatches.json(req.body).then((newJson)=>{
                sucesslog.info("Sucessfull json patch"+JSON.stringify(newJson));
                res.send({status:true,newJson:newJson});
            }).catch((err)=>{
                errorlog.error("Error jsonpatch microservice"+err);
                res.send({status:false});
            })
        }).catch((Err)=>{
            errorlog.error("Error authenticating"+Err);
            res.send({status:false});
        })
    }
    else{
        errorlog.error("Incomplete details"+JSON.stringify(req.body));
        res.send({status:false});
    }
});


/**
 * URL: http://localhost:3000/api/generatethumbnail
 * Content-Type: application/x-www-form-urlencoded
 * Params:
 *  image: string (Image URL)
 *  token: token
 */



app.post('/generatethumbnail',(req,res)=>{

    if(req.body.token && req.body.image){
        auth.validate(req.body.token).then(()=>{
            sucesslog.info("Sucessful validation"+ req.body.token);
            thumbnail.generate(req.body.image).then(filename =>{
                sucesslog.info("Sucessful thumbnail generation"+filename);
                res.send({status:true,filename:filename});
            }).catch((err)=>{
                errorlog.error("Error in thumbnail generation"+err);
                res.send({status:false});
            })
        }).catch((err)=>{
            errorlog.error("Error in authentication" +err);
            res.send({status:false});
        });
    }
    else{
        errorlog.error("Incomplete details"+JSON.stringify(req.body));
        res.send({status:false});
    }

});



module.exports = app;