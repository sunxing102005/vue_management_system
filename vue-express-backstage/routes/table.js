var express = require('express');
var router = express.Router();
var dbhelper = require('../config/dbhelper');
var multer = require('multer')
var upload = multer({dest: 'uploads/'});//设置上传文件存储地址
var fs = require('fs')
//最好不用router.use(),因为请求跨域资源时，浏览器自动发起预检请求
//类型为OPTIONS 。从而获知服务端是否允许该跨域请求。用use这次预检也会走后台
router.post('/table', (req, res, next) => {
    let ret = {};
    let title = req.body.title;
    let status = req.body.status;
    dbhelper.query(`select man.* ,att.id attid,att.newfilename,att.oldfilename from userman man left join attachment att on man.attid = att.id where man.cname like "%${title}%" and man.status like "%${status}%" order by man.xh  `, [], function (err, rows) {
        ret['code'] = 20000;
        if (err) {
            ret['flag'] = false;
            res.send(ret);
        }
        console.log(JSON.stringify(rows));
        ret['data'] = rows;
        ret['flag'] = true;
        res.send(ret);
    })

});
router.post('/update', (req, res, next) => {
    let bd = req.body;
    let ret = {};
    let sql = ` update userman set xh = '${bd.XH}' ,birth ='${bd.BIRTH}' ,
    cname = '${bd.CNAME}',STATUS = '${bd.STATUS}',visitnum = ${bd.VISITNUM},
    title = '${bd.TITLE}',attid = '${bd.FILE?bd.FILE.attId:""}' where id = ${bd.ID}
    `
    debugger
    if (bd.ID == -1) {
        sql = ` insert into userman (ID,XH,BIRTH,CNAME,STATUS,VISITNUM,TITLE,ATTID)
         values (nextval('user_seq'),'${bd.XH}','${bd.BIRTH}',
        '${bd.CNAME}','${bd.STATUS}',${bd.VISITNUM},'${bd.TITLE}','${bd.FILE?bd.FILE.attId:""}') 
        `;
    }
    dbhelper.execTrans([{sql, params: null}], (err, info) => {
        ret['code'] = 20000;
        if (err) {
            ret['flag'] = false;
        } else {
            ret['flag'] = true;
        }
        res.send(ret);
    })
});
router.post('/delete', (req, res, next) => {
    let ids = req.body.ids;
    let ret = {};
    let sql = `delete from userman where id in (${ids})`;
    dbhelper.execTrans([{sql, params: null}], (err, info) => {
        ret['code'] = 20000;
        if (err) {
            ret['flag'] = false;
        } else {
            ret['flag'] = true;
        }
        res.send(ret);
    })
})
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
    debugger
    let ret = {};
    ret['code'] = 20000;
    var file = req.file;
    if (file) {
        var fileNameArr = file.originalname.split('.');
        var suffix = fileNameArr[fileNameArr.length - 1];
        //文件重命名
        fs.renameSync('./uploads/' + file.filename, `./uploads/${file.filename}.${suffix}`);
        file['newfilename'] = `${file.filename}.${suffix}`;
    }
    ret['file'] = file;

    res.send(ret);
})
router.get('/deleteFile', (req, res, next) => {
    var filename = req.query.filename;
    fs.unlinkSync('./uploads/' + filename);
    let ret = {};
    ret['code'] = 20000;
    res.send(ret);
})
router.get('/downloadFile', (req, res, next) => {
    var filename = req.query.filename;
    var oldname = req.query.oldname;
    var file = './uploads/' + filename;
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
        'Content-Disposition': 'attachment; filename=' + encodeURI(oldname),//告诉浏览器这是一个需要下载的文件
    });//设置响应头
    var readStream = fs.createReadStream(file);//得到文件输入流
    debugger
    readStream.on('data', (chunk) => {
        res.write(chunk, 'binary');//文档内容以二进制的格式写到response的输出流
    });
    readStream.on('end', () => {
        res.end();
    })
    // fs.readFile(file,(err,data)=>{
    //     if(err){
    //         res.end('Read Failed!');
    //         return;
    //     }

    //     res.end(data);
    // })
});
router.post('/confirmUpload',(req,res,next)=>{

    //上传确认，文件信息添加到附件表
    let file = req.body;
    debugger
    let ret = {};
    ret['code']=20000;
    let sql = `insert into attachment 
    values (nextval('user_seq'),
    '${file.newFileName}','${file.oldFileName}','./uploads/${file.newFileName}')`;
    dbhelper.execTrans([{sql, params: null}],(err,info)=>{
        if(err){
            ret['flag'] = false;
        }else{
            ret['flag'] = true;
            dbhelper.query('select  currval(\'user_seq\') num ',[],(err,rows)=>{
                let attId = rows[0].num;
                ret['num'] = attId;
                res.send(ret);
            })
        }


    })

})
module.exports = router;