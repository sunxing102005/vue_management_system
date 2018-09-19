var express = require('express');
var router = express.Router();
var token = require('../config/token');
var db = require('../config/db');
router.get('/',(req,res,next)=>{
    db.query('select name from users ',[],function(err,rows){
        console.log(JSON.stringify(rows));
        res.send(rows);
    })
});
router.post('/login',(req,res,next)=>{
    let userName = req.body.username;
    let ret = {};
    let data = {};
    // if(userName=='admin'){
    //     data['token']='111';
    // }else if(userName=='editor'){
    //     data['token']='222';
    // }
    if(userName=='admin'||userName=='editor'){
        data['token'] = token.createToken(req.body,3600);
        ret['code']=20000;
    }else{
        ret['code']=20000;
    }

    ret['data']=data;
    res.send(ret);
});
router.post('/Info',(req,res,next)=>{
    debugger
    var header = req.headers['access_token'];
    let ret = {};
    try{
        var username = token.decodeToken(header)['decoded'].name;
        // let token = req.body.username;

        let data = {};
        if(username=='admin'){
            data['name']='admin';
            data['roles']=['admin'];
        }else{
            data['name']='editor';
            data['roles']=['editor'];
        }
        ret['code']=20000;
        ret['data']=data;
        res.send(ret);
    }catch (e) {
        ret['code']=50008;
        res.send(ret);
    }

});
module.exports = router;