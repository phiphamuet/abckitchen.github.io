var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.username){
    res.render('old/index',{link:'login',req:'Đăng nhập'});
  }else{
    res.render('old/index',{link:'logout',req:'Đăng xuất'});
  }
});
module.exports = router;
