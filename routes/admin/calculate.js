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
router.get('/',admin_not_logged_in,function(req,res,next){
    res.render('admin/calculate',{admin:req.session.admin});
});
router.get('/list',admin_not_logged_in,function(req,res){
    connection.query('SELECT user.username as username,user.fullname as fullname, user.birthdate as birthdate, sum(mon_an.don_gia) as amount from dang_ky_an left join thuc_don_hang_ngay on dang_ky_an.ngay=thuc_don_hang_ngay.ngay left join mon_an on (thuc_don_hang_ngay.ma_mon=mon_an.ma_mon) left join user on user.id=dang_ky_an.user_id where ' +
        'month(thuc_don_hang_ngay.ngay)='+ req.query.month+' and year(thuc_don_hang_ngay.ngay)='+req.query.year +' group by user.id;',function(err,rows,fields){
        res.json({type:'success',content:rows});
    });
});
module.exports = router;