var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('layout');
});
router.get('/lazyload', function(req, res, next) {
  res.render('pages/user');
});
module.exports = router;
