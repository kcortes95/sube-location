var express = require('express');
const db = require('../db');
const mongo = require('../mongo');

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

router.get('/mongo', function(req, res, next) {
    mongo.find(result => {
        res.status(200).send(result);
    });
});

router.get('/:table/near/:lat/:long/:dist', function(req, res, next) {

    mongo.findNear(req.params.table, req.params.lat, req.params.long, req.params.dist, result => {
        res.status(200).send(result);
    });
});

module.exports = router;
