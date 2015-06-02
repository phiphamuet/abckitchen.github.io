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
    console.log(req.query);
    if(req.query.month && req.query.year){
        sql='select day(ngay) as ngay,count(id) as soluong from thuc_te_an where month(ngay)='+req.query.month+' and year(ngay)='+req.query.year+' group by ngay';
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
module.exports = router;