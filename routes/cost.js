var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.username){
    res.render('old/cost',{link:'login',req:'Đăng nhập'});
  }else{
    res.render('old/cost2',{link:'logout',req:'Đăng xuất',userlink:'user',user:'Cá nhân'});
  }
});
//router.get('/lazyload', function(req, res, next) {
//  res.render('pages/news');
//});
module.exports = router;