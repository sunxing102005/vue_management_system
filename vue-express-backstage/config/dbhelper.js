var mysql = require("mysql");
var async = require("async");
var pool = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    connectionLimit:10,
    waitForConnections:false,
    database:'scott'
});
function query(sql,data,callback){
    pool.getConnection((err,connection)=>{
        connection.query(sql,data,(err,rows)=>{
            callback(err,rows);
            connection.release();
        })
    })
}
function execTrans(sqlEntities,callback){
    pool.getConnection(function(err,connection){
        if(err){
            return callback(err,null);
        }
        connection.beginTransaction(function(err){
            if(err){
                return callback(err,null);
            }
            var funcArr = new Array();
            sqlEntities.forEach((sql_params)=>{
                var tempFunc = (callbackEach) =>{
                    let sql = sql_params.sql;
                    let params = sql_params.params;
                    console.log('execute sql :'+sql);
                    connection.query(sql,params,(tErr,rows,fields)=>{
                        if(tErr){
                            connection.rollback(()=>{
                                console.log('transaction failed!');
                                callbackEach(tErr,'error');
                            })
                        }else{
                            callbackEach(null,'ok');
                        }
                    })
                }
                funcArr.push(tempFunc);
            })
            //从上到下执行 函数队列里的函数
            async.series(funcArr,(err,result)=>{
                if(err){
                    connection.rollback(()=>{
                        console.log('transaction error '+err);
                        connection.release();
                        return callback(err,null);
                    })

                }else{
                    //不报错，提交事务
                    connection.commit(function(err,info){
                        if(err){
                            connection.rollback((err)=>{
                                console.log(err);
                            })
                        }else{
                            connection.release();
                            return callback(null,info);
                        }
                    })
                }
            })
        })
    })
}
exports.execTrans=execTrans;
exports.query = query;