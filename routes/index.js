var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});
router.get('/home',function(req,res){
  res.render('pages/home');
});
router.get('/test',function(req,res){
  res.render('index');
});
module.exports = router;
