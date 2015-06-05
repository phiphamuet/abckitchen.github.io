var express = require('express');
var router = express.Router();
var user_not_logged_in= require('./user_not_logged_in');
var mysql=require('mysql');
var connection=require('./../model/config.js');
/* GET users listing. */
router.get('/',user_not_logged_in, function(req, res, next) {
  res.render('old/user',{username:req.session.username,userlink:'user',user:'Cá nhân'});
});
router.get('/checkreg',user_not_logged_in,function(req,res){
  if(req.query.day){
      console.log(req.query);
      var response={};
      var content=req.query.year+'-'+req.query.month+'-'+req.query.day;
      var sql='select mon_an.ten_mon as ten_mon,mon_an.don_gia as don_gia,mon_an.hinh as hinh from thuc_don_hang_ngay join mon_an on thuc_don_hang_ngay.ma_mon = mon_an.ma_mon where thuc_don_hang_ngay.ngay=?';
      var insert=[content];
      sql=mysql.format(sql,insert);
      connection.query(sql,function(err,rows,fields){
          if(err){
              console.log(err);
              res.json({type:'error',content:'Đã có lỗi xảy ra!'});
          }
          else
          {
              response.menu=rows;
              var sql2='select !isNull(user_id) as dang_ky from dang_ky_an where user_id=? and ngay=?';
              var insert2=[req.session.user_id,content];
              sql2=mysql.format(sql2,insert2);
              connection.query(sql2,function(err,rows2,fields2){
                  if(err){
                      console.log(err);
                      res.json({type:'error',content:'Đã có lỗi xảy ra!'});
                  }
                  else
                  {
                      response.reg=rows2;
                      res.json({type:'success',content:response});
                  }
              })
          }
      });
  }
});
router.post('/reg',user_not_logged_in,function(req,res){
  if(req.body.date){
      var date=new Date(req.body.date);
      var sql= 'insert into dang_ky_an(`user_id`,`ngay`) values(?,?)';
      var insert=[req.session.user_id,date];
      sql=mysql.format(sql,insert);
      connection.query(sql,function(err,rows,fields){
          if(err){
              console.log(err);
              res.json({type:'error',content:'Đã có lỗi xảy ra!'});
          }else{
              res.json({type:'success',content:'Đăng ký thành công!'});
          }
      });
  }else{
      res.json({type:'error',content:'Bạn đã nhập thiếu thông tin!'});
  }
});
router.post('/unreg',user_not_logged_in,function(req,res){
  if(req.body.date){
      var date=new Date(req.body.date);
      var sql= 'delete from dang_ky_an where `user_id`=? and `ngay`=?';
      var insert=[req.session.user_id,date];
      sql=mysql.format(sql,insert);
      connection.query(sql,function(err,rows,fields){
          if(err){
            console.log(err);
            res.json({type:'error',content:'Đã có lỗi xảy ra!'});
          }else{
            res.json({type:'success',content:'Hủy đăng ký thành công!'});
          }
      });
  }else{
     res.json({type:'error',content:'Bạn đã nhập thiếu thông tin!'});
  }
})
module.exports = router;
