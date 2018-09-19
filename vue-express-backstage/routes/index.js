var express = require('express');
var router = express.Router();
router.get('/',(req,res,next)=>{
  debugger
  res.render('index.html',{title:'IndexXX'})
})
module.exports = router;