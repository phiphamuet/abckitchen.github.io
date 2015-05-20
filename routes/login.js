/**
 * Created by PHI on 5/18/2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('layout');
});
router.get('/lazyload', function(req, res, next) {
    res.render('pages/login');
});
router.post('/',function(req,res,next){
    console.log(req.body);
    res.end('DMM');
});
module.exports = router;
