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
    res.render('admin/statistic',{admin:req.session.admin});
});
router.get('/list',admin_not_logged_in,function(req,res,next){
    var sql='select dang_ky_an.ngay as ngay,dang_ky_an.user_id as id,user.fullname as fullname, user.username as username,user.mobiphone as sdt, !isnull(thuc_te_an.ngay) as den_an from dang_ky_an left join thuc_te_an on (dang_ky_an.ngay=thuc_te_an.ngay and dang_ky_an.user_id=thuc_te_an.user_id) join user on dang_ky_an.user_id=user.id where month(dang_ky_an.ngay)=? and year(dang_ky_an.ngay)=? and day(dang_ky_an.ngay)=?';
    var insert=[req.query.month,req.query.year,req.query.day];
    sql=mysql.format(sql,insert);
    connection.query(sql,function(err,rows,fields){
        if(err) {
            console.log(err);
            res.json({type:'error',content:'Đã có lỗi xảy ra'});
        }
        else{
            res.json({type:'success',content:rows});
        }
    });
});
router.post('/sync',admin_not_logged_in,function(req,res,next){
    console.log(req.body);
    if(req.body.date&&req.body.content){
        var day=new Date(req.body.date);
        var content=req.body.content;
        content.forEach(function(val,index){
            if(val.den_an==true){
                var sql='select * from thuc_te_an where ??=? and ??=?';
                var insert=['user_id',val.id,'ngay',day];
                sql=mysql.format(sql,insert);
                connection.query(sql,function(err,rows,fields){
                    console.log(rows);
                    if(err){
                        console.log(err);
                        res.json({type:'error',content:'Đã có lỗi xảy ra'});
                    }else if(isNull(rows)){
                        var sql2='insert into thuc_te_an(??,??) values(?,?)';
                        var insert2=['ngay','user_id',day,val.id];
                        sql2=mysql.format(sql2,insert2);
                        connection.query(sql2,function(err,rows2,fields2){
                            if(err){
                                console.log(err);
                                res.json({type:'error',content:'Đã có lỗi xảy ra'});
                            }
                            else if(index==content.length-1){
                                res.json({type:'success',content:'Đồng bộ thành công!'});
                            }
                        })
                    }else{
                        if(index==content.length-1){
                            res.json({type:'success',content:'Đồng bộ thành công!'});
                        }
                    }
                })
            }else{
                var sql='select * from thuc_te_an where ??=? and ??=?';
                var insert=['user_id',val.id,'ngay',day.getFullYear()+"-"+(day.getMonth()+1)+"-"+day.getDate()];
                sql=mysql.format(sql,insert);
                console.log(sql);
                connection.query(sql,function(err,rows,fields){
                    console.log(rows);
                    if(err){
                        console.log(err);
                        res.json({type:'error',content:'Đã có lỗi xảy ra'});
                    }else if(!isNull(rows)){
                        var sql2='delete from thuc_te_an where ??=? and ??=?';
                        var insert2=['ngay',day.getFullYear()+"-"+(day.getMonth()+1)+"-"+day.getDate(),'user_id',val.id];
                        sql2=mysql.format(sql2,insert2);
                        console.log(sql2);
                        connection.query(sql2,function(err,rows2,fields2){
                            if(index==content.length-1){
                                res.json({type:'success',content:'Đồng bộ thành công!'});
                            }
                        })
                    }else{
                        if(index==content.length-1){
                            res.json({type:'success',content:'Đồng bộ thành công!'});
                        }
                    }
                })
            }
        })
    }
    else{
        res.json({type:'error',content:'Thiếu thông tin'});
    }
});
module.exports = router;