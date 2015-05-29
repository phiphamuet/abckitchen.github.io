/**
 * Created by PHI on 5/24/2015.
 */
var express = require('express');
var router=express.Router();
var connection=require('./../../model/config.js');
var isNull=require('./../isNull');
var async=require('async');
var mysql=require('mysql');
var admin_not_logged_in=require('./admin_not_logged_in');
var crypto=require('crypto');
var secretKey=require('./../../model/secretKey');
router.get('/',admin_not_logged_in,function(req,res,next){
    res.render('admin/user',{admin:req.session.admin});
});
//get list user
router.get('/list',admin_not_logged_in,function(req,res){
    connection.query('SELECT * from user',function(err,rows,fields){
        res.json({type:'success',content:rows});
    });
});
//create new user
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
//delte user
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
//update info user
router.put('/update',admin_not_logged_in,function(req,res,next){
   console.log(req.body);
    if(req.body.id&&req.body.username&&req.body.birthdate&&req.body.fullname&&req.body.password&&req.body.address&&req.body.email&&req.body.identitycard&&req.body.mobiphone&&req.body.gender){
        async.parallel([
            function(cb){
                connection.query('select * from user where username="'+req.body.username+'"',cb);
            },
            function(cb){
                connection.query('select * from user where email="'+req.body.email+'"',cb);
            },
            function(cb){
                connection.query('select * from user where identitycard="'+req.body.identitycard+'"',cb);
            },
            function(cb){
                connection.query('select * from user where mobiphone="'+req.body.phone+'"',cb);
            }
        ],function(err,rows,fields){
            if(err) console.log(err);
            else{
                if(!isNull(rows[0][0])&&rows[0][0][0].id!=req.body.id){
                    res.json({type:'error',content:'Tài khoản đã tồn tại!'});
                }
                else if(!isNull(rows[1][0])&&rows[1][0][0].id!=req.body.id){
                    res.json({type:'error',content:'Email đã tồn tại!'});
                }
                else if(!isNull(rows[2][0])&&rows[2][0][0].id!=req.body.id) {
                    res.json({type:'error',content:'Số CMTND đã tồn tại!'});
                }
                else if(!isNull(rows[3][0])&&rows[3][0][0].id!=req.body.id) {
                    res.json({type:'error',content:'Số điện thoại đã tồn tại!'});
                }
                else{
                    console.log("run to here")
                    var date=new Date(req.body.birthdate);
                    var updateUser={
                        username:req.body.username,
                        fullname:req.body.fullname,
                        birthdate:date,
                        gender:req.body.gender,
                        address:req.body.address,
                        email:req.body.email,
                        identitycard:req.body.identitycard,
                        mobiphone:req.body.mobiphone
                    };
                    //var query='update user set username="'+updateUser.username+'", fullname ="'+updateUser.fullname+'",birthdate="'+updateUser.birthdate.toLocaleDateString()+'",gender="'+updateUser.gender +
                    //    '",address="'+updateUser.address+'",email="'+updateUser.email+'",identitycard="'+updateUser.identitycard+'",mobiphone="'+updateUser.mobiphone+'" where id="'+req.body.id+'"';
                    var sql = "UPDATE user set ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? WHERE ?? = ?";
                    var inserts=['username',req.body.username,'fullname',req.body.fullname,'birthdate',date,'gender',req.body.gender,'address',req.body.address,'email',req.body.email,'identitycard',req.body.identitycard,'mobiphone',req.body.mobiphone,'id',req.body.id];
                    sql=mysql.format(sql,inserts);
                    if(req.body.change_password&&req.body.change_password!=''){
                        updateUser.password=crypto.createHash('md5').update(req.body.change_password+secretKey).digest('hex');
                        sql = "UPDATE user set ??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=?,??=? WHERE ?? = ?";
                        var inserts=['username',req.body.username,'fullname',req.body.fullname,'birthdate',date,'gender',req.body.gender,
                            'address',req.body.address,'email',req.body.email,'identitycard',req.body.identitycard,'mobiphone',
                            req.body.mobiphone,'password',updateUser.password,'id',req.body.id];
                        sql=mysql.format(sql,inserts);
                    }
                    console.log(sql);
                    connection.query(sql,function(err,result){
                        if(err) console.log(err);
                        else{
                            console.log(result);
                            res.json({type:'success',content:'Cập nhật thông tin thành công!'});
                        };
                    });
                }
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin'});
    }
});
module.exports = router;