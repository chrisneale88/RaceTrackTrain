/**
 * Created by Kristoff on 24/06/2016.
 */

var express = require('express');
var router = express.Router();

/* GET error page. */
router.get('/', function(req, res, next) {
    res.render('error', { title: 'ERROR' });
});

module.exports = router;
