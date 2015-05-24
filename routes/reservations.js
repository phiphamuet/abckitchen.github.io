/**
 * Created by PHI on 5/18/2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('old/reservations');
});
router.get('/lazyload', function(req, res, next) {
    res.render('pages/reservations');
});
module.exports = router;