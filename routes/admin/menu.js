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
    res.render('admin/menu',{admin:req.session.admin});
});
router.get('/dish',admin_not_logged_in,function(req,res,next){
    connection.query('select * from mon_an',function(err,rows,fields){
        if(err) console.log(err);
        else if(isNull(rows)){
            res.json({type:'error',content:''})
        }else{
            res.json({type:'success',content: rows});
        }
    });
});
router.get('/list',admin_not_logged_in,function(req,res,next){
    connection.query('select * from thuc_don_hang_ngay join mon_an on(mon_an.ma_mon=thuc_don_hang_ngay.ma_mon)',function(err,rows,fields){
        if(err) console.log(err);
        else if(isNull(rows)){
            res.json({type:'error',content:''})
        }else{
            res.json({type:'success',content: rows});
        }
    });
});
router.post('/sync',admin_not_logged_in,function(req,res,next){
    console.log(req.body);
    var data=JSON.parse(req.body.content);
    console.log(data);
    async.waterfall([
        function(nextStep){
            var sql='delete from thuc_don_hang_ngay';
            connection.query(sql,function(err,rows,fields){
                nextStep();
            });
        },function(cb){
            data.forEach(function(value){
                var newDate=new Date(value.ngay);
                connection.query('select * from mon_an where ten_mon="'+value.ten_mon+'"',function(err,rows,fields){
                    var newDish={
                        ngay:newDate,
                        ma_mon: rows[0].ma_mon
                    };
                    connection.query('insert into thuc_don_hang_ngay set ?',newDish,function(err,result){
                        if(err) console.log(err);
                        if(value==data[data.length-1]) cb("Cập nhật thực đơn thành công!");
                    });
                });
            });
        }
    ],function(result){
        res.json(result);
    })
});
module.exports = router;