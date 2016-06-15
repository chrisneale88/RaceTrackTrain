var express = require('express');
var router = express.Router();

router.get('/', function( req, res, next) {
  res.send('The magic medicine works!');
});

router.post('/', function( req, res, next) {
  res.render('racetracker');
});

module.exports = router;
