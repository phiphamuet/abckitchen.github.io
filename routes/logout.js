/**
 * Created by PHI on 5/23/2015.
 */
var express = require('express');
var router = express.Router();
var user_not_logged_in=require('./user_not_logged_in');
router.get('/',user_not_logged_in,function(req,res,next){
   if(req.session.username){
       res.session.destroy(function(err){
           if(err){
               throw err;
           }else{
               console.log("destroyed");
               res.json({type:'success',content:'redirect home page'});
           }
       });
   }
});

module.exports=router;