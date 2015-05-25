/**
 * Created by PHI on 5/24/2015.
 */
var express = require('express');
var router=express.Router();
var connection=require('./../../model/config.js');
var isNull=require('./../isNull');
var async=require('async');
var admin_not_logged_in=require('./admin_not_logged_in');
var crypto=require('crypto');
var secretKey=require('./../../model/secretKey');
router.get('/',admin_not_logged_in,function(req,res,next){
    res.render('admin/user',{admin:req.session.admin});
});
router.get('/list',admin_not_logged_in,function(req,res){
    connection.query('SELECT * from user',function(err,rows,fields){
        res.json(rows);
    });
});
router.post('/new',function(req,res){
    console.log(req.body);
    if(req.body.username&&req.body.birthdate&&req.body.fullname&&req.body.password&&req.body.address&&req.body.email&&req.body.identity&&req.body.phone&&req.body.sex){
        async.parallel([
            function(cb){
                connection.query('select * from user where username="'+req.body.username+'"',cb);
            },
            function(cb){
                connection.query('select * from user where email="'+req.body.email+'"',cb);
            },
            function(cb){
                connection.query('select * from user where identitycard="'+req.body.identity+'"',cb);
            },
            function(cb){
                connection.query('select * from user where mobiphone="'+req.body.phone+'"',cb);
            }
        ],function(err,rows,fields){
            if(err) console.log(err);
            else{
                if(!isNull(rows[0][0])) res.json({type:'error',content:'Tài khoản đã tồn tại!'});
                else if(!isNull(rows[1][0])) res.json({type:'error',content:'Email đã tồn tại!'});
                else if(!isNull(rows[2][0])) res.json({type:'error',content:'Số CMTND đã tồn tại!'});
                else if(!isNull(rows[3][0])) res.json({type:'error',content:'Số điện thoại đã tồn tại!'});
                else{

                    var date=new Date(req.body.birthdate);
                    var newUser={
                            username:req.body.username,
                            password:crypto.createHash('md5').update(req.body.password+secretKey).digest('hex'),
                            fullname:req.body.fullname,
                            birthdate:date,
                            gender:req.body.sex,
                            address:req.body.address,
                            email:req.body.email,
                            identitycard:req.body.identity,
                            mobiphone:req.body.phone
                    };
                    connection.query('insert into user set ?',newUser,function(err,result){
                        if(err) console.log(err);
                        else{
                            console.log(result);
                            res.json({type:'success',content:'Tạo người dùng thành công!'});
                        };
                    });
                }
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin'});
    }
});
router.delete('/delete/:username',admin_not_logged_in,function(req,res,next){
    console.log(req.params);
    if(req.params.username){
        connection.query('DELETE FROM USER WHERE USERNAME="'+req.params.username+'"',function(err,rows,field){
            if(err) console.log(err);
            else{
                res.json({type:'success',content:'Đã xóa người dùng!'});
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin'});
    }
});
module.exports = router;