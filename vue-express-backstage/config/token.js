const jwt = require('jsonwebtoken');
const secret = 'JWT-Token';
const token = {
    createToken(obj,timeout){
        let payload = {
            name:obj.username
        }
        let tokens = jwt.sign(payload,secret,{expiresIn:timeout});
        return tokens;
    },
    decodeToken(tokens){
        let res = false;
        jwt.verify(tokens,secret,function(err,decoded){
            if(err){
                res = {flag:false};
            }else{
                res={flag:true,decoded};
            }
        })
        return res;
    }
};
module.exports = token;