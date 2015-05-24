/**
 * Created by PHI on 5/19/2015.
 */
var express = require('express');
var router = express.Router();
var connection=require('./../model/config.js');
var isNull=require('./isNull');
var crypto=require('crypto');
var secretKey=require('./../model/secretKey');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.admin){
        res.render('old/admin',{link:'/admin',req:'Đăng nhập'});
    }else{
        res.redirect('/manager');
    }
});
router.post('/',function(req,res,next){
    console.log(req.body);
    if(req.body.username!=''&&req.body.password!=''&&req.body.username&&req.body.password){
        connection.query('SELECT password from admin where username="'+req.body.username+'" limit 1',function(err,rows,fields){
            console.log(rows);
            if(err) throw err;
            else if(isNull(rows)){
                res.json({type:'error',content:'Tài khoản không tồn tại!'})
            }else{
                if(rows[0].password==crypto.createHash('md5').update(req.body.password+secretKey).digest('hex')){
                    req.session.admin=req.body.username;
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
