var express = require('express');
var menu=require('./menu');
var index=require('./index');
var about=require('./about');
var gallery=require('./gallery');
var blog=require('./blog');
var contact=require('./contact');
var users = require('./users');
var router=express.Router();

router.use('/index',index);
router.use('/',index);
router.use('/about',about);
router.use('/gallery',gallery);
router.use('/blog',blog);
router.use('/user',users);
router.use('/contact',contact);
router.use('/menu',menu);
module.exports = router;