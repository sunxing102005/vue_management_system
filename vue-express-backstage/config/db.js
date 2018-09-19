var mysql = require("mysql");
var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'scott',
    useConnectionPooling: true
})
function query(sql,data,callback){
    connection.query(sql,data,function(err,rows){
        callback(err,rows);
    })
}
exports.query = query;