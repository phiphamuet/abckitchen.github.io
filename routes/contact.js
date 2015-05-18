var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout');
});
router.get('/lazyload', function(req, res, next) {
  res.render('pages/contact');
});
module.exports = router;