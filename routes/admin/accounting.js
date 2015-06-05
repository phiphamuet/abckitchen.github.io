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
module.exports = router;