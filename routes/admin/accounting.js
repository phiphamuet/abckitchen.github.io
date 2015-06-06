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
    if(req.body.thuc_pham&&req.body.so_luong&&req.body.don_gia&&req.body.ngay){
        var sql='select * from ke_toan where ??=? and ??=?';
        var insert=['thuc_pham',req.body.thuc_pham,'ngay',new Date(req.body.ngay)];
        sql=mysql.format(sql,insert);
        console.log(sql);
        connection.query(sql,function(err,rows,fields){
            if(err) {
                console.log(err);
                res.json({type:'error',content:'Đã có lỗi xảy ra!'});
            }
            else if(isNull(rows)){
                var sql2='insert into ke_toan(??,??,??,??) values(?,?,?,?)';
                var insert2=['ngay','so_luong','don_gia','thuc_pham',new Date(req.body.ngay),req.body.so_luong,req.body.don_gia,req.body.thuc_pham];
                sql2=mysql.format(sql2,insert2);
                connection.query(sql2,function(err,rows2,fields2){
                    if(err) {
                        console.log(err);
                        res.json({type:'error',content:'Đã có lỗi xảy ra!'});
                    }else{
                        res.json({type:'success',content:'Thêm thực phẩm thành công!'});
                    }
                })
            }else{
                res.json({type:'error',content:'Thực phẩm này đã có! Bạn hãy cập nhật lại ở trên!'})
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin'});
    }
});
//delte user
router.delete('/delete/:id',admin_not_logged_in,function(req,res,next){
    console.log(req.params);
    if(req.params.id){
        connection.query('DELETE FROM KE_TOAN WHERE ID="'+req.params.id+'"',function(err,rows,field){
            if(err) {
                console.log(err);
                res.json({type:'error',content:'Có lỗi xảy ra! Có thể người dùng đã đăng ký ăn!'});
            }
            else{
                res.json({type:'success',content:'Đã xóa thực phẩm!'});
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin'});
    }
});
//update info user
router.put('/update',admin_not_logged_in,function(req,res,next){
    console.log(req.body);
    if(req.body.thuc_pham&&req.body.so_luong&&req.body.don_gia&&req.body.ngay&&req.body.id){
        var sql='select * from ke_toan where ??=? and ??=?';
        var insert=['thuc_pham',req.body.thuc_pham,'ngay',new Date(req.body.ngay)];
        sql=mysql.format(sql,insert);
        console.log(sql);
        connection.query(sql,function(err,rows,fields){
            if(err) {
                console.log(err);
                res.json({type:'error',content:'Đã có lỗi xảy ra!'});
            }
            else if(isNull(rows)){
                var sql2='update ke_toan set ??=?,??=?,??=?,??=? where ??=?';
                var insert2=['ngay',new Date(req.body.ngay),'so_luong',req.body.so_luong,'don_gia',req.body.don_gia,'thuc_pham',req.body.thuc_pham,'id',req.body.id];
                sql2=mysql.format(sql2,insert2);
                connection.query(sql2,function(err,rows2,fields2){
                    if(err) {
                        console.log(err);
                        res.json({type:'error',content:'Đã có lỗi xảy ra!'});
                    }else{
                        res.json({type:'success',content:'Cập nhật thực phẩm thành công!'});
                    }
                })
            }else{
                if(req.body.id==rows[0].id){
                    var sql2='update ke_toan set ??=?,??=?,??=?,??=? where ??=?';
                    var insert2=['ngay',new Date(req.body.ngay),'so_luong',req.body.so_luong,'don_gia',req.body.don_gia,'thuc_pham',req.body.thuc_pham,'id',req.body.id];
                    sql2=mysql.format(sql2,insert2);
                    connection.query(sql2,function(err,rows2,fields2){
                        if(err) {
                            console.log(err);
                            res.json({type:'error',content:'Đã có lỗi xảy ra!'});
                        }else{
                            res.json({type:'success',content:'Cập nhật thực phẩm thành công!'});
                        }
                    })
                }else{
                    res.json({type:'error',content:'Thực phẩm này đã có! Bạn hãy cập nhật lại ở trên!'});
                }
            }
        })
    }else{
        res.json({type:'error',content:'Bạn đã nhập thiếu thông tin'});
    }
});
module.exports = router;