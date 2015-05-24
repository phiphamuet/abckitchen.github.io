/**
 * Created by PHI on 5/24/2015.
 */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session){
        req.session.destroy();
        res.redirect('/');
    }else{
        res.redirect('/');
    }
});
module.exports = router;
