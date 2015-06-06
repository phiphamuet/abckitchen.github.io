var express = require('express');
var router = express.Router();
var user_not_logged_in= require('./user_not_logged_in');
var mysql=require('mysql');
var connection=require('./../model/config.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.username){
    res.render('old/cost',{link:'login',req:'Đăng nhập'});
  }else{
    res.render('old/cost2',{link:'logout',req:'Đăng xuất',userlink:'user',user:'Cá nhân'});
  }
});
router.get('/list',user_not_logged_in, function(req, res, next) {
    var date=new Date();
    var sql='select dang_ky_an.user_id as id, sum(mon_an.don_gia) as gia, dang_ky_an.ngay as ngay from dang_ky_an join thuc_don_hang_ngay on dang_ky_an.ngay=thuc_don_hang_ngay.ngay join mon_an on thuc_don_hang_ngay.ma_mon=mon_an.ma_mon where dang_ky_an.user_id=? and month(dang_ky_an.ngay)=? and year(dang_ky_an.ngay)=? group by dang_ky_an.ngay;'
    var insert=[req.session.user_id,date.getMonth()+1,date.getFullYear()];
    sql=mysql.format(sql,insert);
    connection.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            res.json({type:'error',content:'Đã có lỗi xảy ra!'});
        }else{
            res.json({type:'success',content:rows});
        }
    })
});
module.exports = router;