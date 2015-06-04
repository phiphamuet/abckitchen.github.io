/**
 * Created by PHI on 5/24/2015.
 */
var express = require('express');
var router=express.Router();
var admin_not_logged_in=require('./admin_not_logged_in');
var connection=require('./../../model/config.js');
var isNull=require('./../isNull');
var async=require('async');
var mysql=require('mysql');
router.get('/',admin_not_logged_in,function(req,res,next){
    res.render('admin/track',{admin:req.session.admin});
});
router.get('/register',admin_not_logged_in,function(req,res,next){
    console.log(req.query);
    if(req.query.month && req.query.year){
        sql='select day(ngay) as ngay,count(id) as soluong from dang_ky_an where month(ngay)='+req.query.month+' and year(ngay)='+req.query.year+' group by ngay';
        connection.query(sql,function(err,rows,fields){
            if(err) {
                console.log(err);
                res.json({type:'error',content:'Đã có lỗi xảy ra!'});
            }else if(isNull(rows)){
                res.json({type:'error',content:'Không có dữ liệu về đăng ký ăn!'})
            }else{
                res.json({type:'success',content:rows});
            }
        })
    }
    else{
        res.json({type:'error',content:"Thiếu thông tin!"});
    }
});
router.get('/real',admin_not_logged_in,function(req,res,next){
    if(req.query.month && req.query.year){
        sql='select day(ngay) as ngay,count(id) as soluong from thuc_te_an where month(ngay)='+req.query.month+' and year(ngay)='+req.query.year+' group by ngay';
        connection.query(sql,function(err,rows,fields){
            if(err) {
                console.log(err);
                res.json({type:'error',content:'Đã có lỗi xảy ra!'});
            }else if(isNull(rows)){
                res.json({type:'success',content:[]});
            }else{
                res.json({type:'success',content:rows});
            }
        })
    }
    else{
        res.json({type:'error',content:"Thiếu thông tin!"});
    }
});
router.get('/abort',admin_not_logged_in,function(req,res,next){
    if(req.query.month && req.query.year){
        var date=new Date();
        sql='select dang_ky_an.ngay as ngay, dang_ky_an.user_id as user_id, user.username as username, user.fullname as fullname, user.birthdate as birthdate, user.mobiphone as sdt from dang_ky_an left join thuc_te_an on (dang_ky_an.ngay=thuc_te_an.ngay and dang_ky_an.user_id=thuc_te_an.user_id) join user on(dang_ky_an.user_id=user.id) where thuc_te_an.id is null and month(dang_ky_an.ngay)='+req.query.month+' and year(dang_ky_an.ngay)='+req.query.year+' and day(dang_ky_an.ngay)<='+date.getDate()+' group by ngay';
        console.log(sql);
        connection.query(sql,function(err,rows,fields){
            if(err) {
                console.log(err);
                res.json({type:'error',content:'Đã có lỗi xảy ra!'});
            }else if(isNull(rows)){
                res.json({type:'success',content:[]});
            }else{
                res.json({type:'success',content:rows});
            }
        })
    }
    else{
        res.json({type:'error',content:"Thiếu thông tin!"});
    }
});
module.exports = router;