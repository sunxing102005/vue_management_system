var express = require('express');
var createError = require('http-errors');
var path = require('path');
var ejs = require('ejs');
const bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});
require('./websocket/wsServer');
app.use(jsonParser);
app.use(urlencodedParser);
// app.use(bodyParser({uploadDir:'./upload'}))
// var routes = require('./routes')(app);
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var tableRouter = require('./routes/table');
const routePass = ['/user/login','/'];//访问白名单
let token = require('./config/token')
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.engine('html',ejs.renderFile);
app.set('port',process.env.PORT||9010);
app.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','PUT, GET ,POST,DELETE,OPTIONS ');
    res.header('Access-Control-Allow-Headers', "Content-Type, access_token, X-Requested-With");
    if(routePass.indexOf(req.originalUrl)!=-1||req.originalUrl.split('/').indexOf('static')!=-1
    ||req.originalUrl.split('/').indexOf('uploadFile')!=-1||req.originalUrl.indexOf('downloadFile')!=-1){
        next();
    }else{
        if(req.method !='OPTIONS'){

            let header = req.headers['access_token'];
            let rest = token.decodeToken(header);
            if(rest.flag){
                next();
            }else{
                res.send({code:50008});
            }
        }else{
            next();
        }
    }
})
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'public',"index.html"));
})
app.use('/',indexRouter);
app.use('/user',userRouter);
app.use('/table',tableRouter);
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    console.error(err.stack);
    res.render('error.html');
});
app.listen(app.get('port'),()=>{

    // console.log('express started on port 7000')
});