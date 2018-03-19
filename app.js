
global.express  = require('express');
const bodyParser = require('body-parser');
global.jwt = require('jsonwebtoken');
global.jsonpatch = require('json-patch');
global.gm = require('gm').subClass({imageMagick:true});
global.imagedownloader = require('image-downloader');

global.sucesslog = require('./log.js').successlog;
global.errorlog = require('./log.js').errorlog;

const responsetime = require('response-time');

const app = express();

const routes = require('./routes.js');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(responsetime((req,res,time)=>{
    console.log(time);
    sucesslog.info("Response time for"+req.url+"is"+time);
}));

app.use('/api',routes);

app.use((req,res)=>{
    errorlog.error("404 error from\t"+req.url);
    res.send("404 error");
});

app.use((error,req,res)=>{
    errorlog.error("500 error"+error);
    res.send("500 error");
});

app.listen(3000,()=>{
    console.log('Server listening at Port 3000');
});