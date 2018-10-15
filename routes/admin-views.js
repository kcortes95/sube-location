var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/top-ip', function(req, res, next) {
    res.render('top-ip');
});

module.exports = router;
