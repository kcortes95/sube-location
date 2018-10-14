var express = require('express');
const db = require('../db');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    db  .query('SELECT * FROM "registraTuTarjeta"')
        .then(result => {
            res.status(200).send(result);
        });
});

module.exports = router;
