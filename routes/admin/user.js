/**
 * Created by PHI on 5/24/2015.
 */
var express = require('express');
var router=express.Router();
var admin_not_logged_in=require('./admin_not_logged_in');
router.get('/',admin_not_logged_in,function(req,res,next){
    res.render('admin/user',{admin:req.session.admin});
});
module.exports = router;