/**
 * Created by PHI on 5/24/2015.
 */
var express = require('express');
var router=express.Router();
var connection=require('./../../model/config.js');
var admin_not_logged_in=require('./admin_not_logged_in');
var isNull=require('./../isNull');
var async=require('async');
var mysql=require('mysql');
router.get('/',admin_not_logged_in,function(req,res,next){
    res.render('admin/accounting',{admin:req.session.admin});
});
router.get('/list',admin_not_logged_in,function(req,res){
    var sql='SELECT * from ke_toan where month(ngay)=? and year(ngay)=? and day(ngay)=?';
    var insert=[req.query.month,req.query.year,req.query.day];
    sql=mysql.format(sql,insert);
    connection.query(sql,function(err,rows,fields){
        if(err) res.json({type:'error',content:'Đã có lỗi xảy ra'});
        else{
            res.json({type:'success',content:rows});
        }
    });
});
router.post('/new',function(req,res){
    console.log(req.body);
    if(req.body.phone&&req.body.sex){
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
module.exports = router;