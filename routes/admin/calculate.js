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
    var sql='SELECT user.id as id,user.username as username,user.fullname as fullname, user.birthdate as birthdate,ISNULL(thanh_toan.ngay) as paid , sum(mon_an.don_gia) as amount from dang_ky_an left join thuc_don_hang_ngay on dang_ky_an.ngay=thuc_don_hang_ngay.ngay left join mon_an on (thuc_don_hang_ngay.ma_mon=mon_an.ma_mon) left join user on user.id=dang_ky_an.user_id left join thanh_toan on (thanh_toan.user_id=user.id and month(thanh_toan.ngay)=month(thuc_don_hang_ngay.ngay) and year(thanh_toan.ngay)=year(thuc_don_hang_ngay.ngay) ) ' +
        'where month(thuc_don_hang_ngay.ngay)='+req.query.month+' and year(thuc_don_hang_ngay.ngay)='+req.query.year+' group by user.id;';
    connection.query(sql,function(err,rows,fields){
        res.json({type:'success',content:rows});
    });
});
router.post('/sync',admin_not_logged_in,function(req,res){
    console.log(req.body);
    if(isNull(req.body.content)){
        res.json({type:'error',content:'Không có nội dung!'});
    }else{
        var date=new Date(req.body.date);
        var month=date.getMonth()+1;
        var year=date.getFullYear();
        var content=req.body.content;

        content.forEach(function(val,index){
            if(val.paid==true){
                var sql='select * from thanh_toan where ??=? and month(ngay)=? and year(ngay)=?';
                var insert=['user_id',val.id,month,year];
                sql=mysql.format(sql,insert);
                connection.query(sql,function(err,rows,fields){
                    if(isNull(rows)){
                        var sql2='insert into thanh_toan(`user_id`,`ngay`) values(?,?);';
                        var insert2=[val.id,new Date(year,month-1)];
                        sql2=mysql.format(sql2,insert2);
                        connection.query(sql2,function(err,rows2,fields2){
                            if(err) console.log(err);
                            if(index==content.length-1){
                                res.json({type:'success',content:'Đồng bộ thành công!'});
                            }
                        });
                    }else{
                        if(index==content.length-1){
                            res.json({type:'success',content:'Đồng bộ thành công!'});
                        }
                    }
                });
            }else{
                var sql='select * from thanh_toan where ??=? and month(ngay)=? and year(ngay)=?';
                var insert=['user_id',val.id,month,year];
                sql=mysql.format(sql,insert);
                connection.query(sql,function(err,rows,fields){
                    if(err) console.log(err);
                    if(isNull(rows)){
                        if(index==content.length-1){
                            res.json({type:'success',content:'Đồng bộ thành công!'});
                        }
                    }else{
                        var sql2='delete from thanh_toan where user_id=? and month(ngay)=? and year(ngay)=?';
                        var insert2=[val.id,month, year];
                        sql2=mysql.format(sql2,insert2);
                        console.log(sql2);
                        connection.query(sql2,function(err,result,fields){
                            if(index==content.length-1){
                                res.json({type:'success',content:'Đồng bộ thành công!'});
                            }
                        });
                    }
                });
            }
        });
    }
});
module.exports = router;