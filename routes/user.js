var express = require('express');
var router = express.Router();
var user_not_logged_in= require('./user_not_logged_in');
/* GET users listing. */
router.get('/',user_not_logged_in, function(req, res, next) {
  res.render('old/user',{username:req.session.username,userlink:'user',user:'Cá nhân'});
});

module.exports = router;
