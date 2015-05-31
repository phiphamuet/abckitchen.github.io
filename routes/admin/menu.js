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
        function update(cb){
            var sql = 'select * from thuc_don_hang_ngay';
            connection.query(sql,function(err,rows,fields){
                if(err) console.log(err);
                rows.forEach(function(iterator){
                    var test=false;
                    var temp={};
                    for(var i=0;i<data.length;i++){
                        if(data[i].hasOwnProperty('id')){
                            if(data[i].id==iterator.id){
                                test=true;
                                temp=data[i];
                            }
                        }
                    }
                    if(test==true){
                        var date=new Date(temp.ngay);
                        var sql2= 'update thuc_don_hang_ngay set ??=?,??=?';
                        insert=['ngay',date,'ma_mon',temp.ma_mon];
                        sql2=mysql.format(sql2,insert);
                        connection.query(sql2);
                    }else{
                        var sql3='delete from thuc_don_hang_ngay where ??=?';
                        var insert2=['id',iterator.id];
                        sql3=mysql.format(sql3,insert2);
                        connection.query(sql3);
                    }
                });
            });
            data.forEach(function(value){
                if(value.hasOwnProperty('id')){

                }else{
                    var newDate=new Date(value.ngay);
                    connection.query('select * from mon_an where ten_mon="'+value.ten_mon+'"',function(err,rows,fields){
                        console.log(rows);
                        var newDish={
                            ngay:newDate,
                            ma_mon: rows[0].ma_mon
                        };
                        connection.query('insert into thuc_don_hang_ngay set ?',newDish,function(err,result){
                            if(err) console.log(err);
                        });
                    })
                };
            });
            cb("it's ok")
        }
    ],function(result){
        res.json(result);
    })
});
module.exports = router;