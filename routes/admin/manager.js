/**
 * Created by PHI on 5/24/2015.
 */
var express = require('express');
var router=express.Router();
var dashboard=require('./dashboard');
var user=require('./user');
var menu=require('./menu');
var statistic=require('./statistic');
var track=require('./track');
var calculate=require('./calculate');
var accounting=require('./accounting');

router.use('/accounting',accounting);
router.use('/calculate',calculate);
router.use('/track',track);
router.use('/statistic',statistic);
router.use('/menu',menu);
router.use('/user',user);
router.use('/',dashboard);
module.exports = router;