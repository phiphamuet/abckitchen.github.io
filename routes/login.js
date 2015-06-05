/**
 * Created by PHI on 5/18/2015.
 */
var express = require('express');
var router = express.Router();
var connection=require('./../model/config.js');
var isNull=require('./isNull');
var crypto=require('crypto');
var secretKey=require('./../model/secretKey');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.username){
        res.render('old/login',{link:'login',req:'Đăng nhập'});
    }else{
        res.redirect('/user');
    }
});
router.post('/',function(req,res,next){
    console.log(req.body);
    if(req.body.username!=''&&req.body.password!=''&&req.body.username&&req.body.password){
        connection.query('SELECT * from user where username="'+req.body.username+'" limit 1',function(err,rows,fields){
            console.log(rows);
            if(err) throw err;
            else if(isNull(rows)){
                res.json({type:'error',content:'Tài khoản không tồn tại!'})
            }else{
                if(rows[0].password==crypto.createHash('md5').update(req.body.password+secretKey).digest('hex')){
                    req.session.username=req.body.username;
                    req.session.user_id=rows[0].id;
                    res.json({type:'success',username:req.session.username});
                }else{
                    res.json({type:'error',content:'Mật khẩu không chính xác!'});
                }
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin!'});
    }
});
module.exports = router;
