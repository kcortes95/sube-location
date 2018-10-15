var express = require('express');
const mongo = require('../mongo');
const db = require('../db');
const query = require('../psql-query');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/psql/:table', function (req, res) {

    db.doQuery(query.findAll(req.params.table), result => {
        res.render('map', {
            title: "Express API", // Give a title to our page
            jsonData: result // Pass data to the View
        });
    });

    console.log(req.ip);

});

router.get('/psql/near/:table/:lat/:lng/:meters', function (req, res) {

    db.doQuery(query.findNear(req.params.table, req.params.lat, req.params.lng, req.params.meters) , result => {
        res.render('map', {
            title: "Express API", // Give a title to our page
            jsonData: result // Pass data to the View
        });
    });
    db.doInsert(query.insertToAccessToURL(req.ip, req.params.lat, req.params.lng), result => result);
});

router.get('/kevin', function(req, res, next) {
    db.getTopIP(result => res.status(200).send(result));
});

router.get('/mongo', function(req, res, next) {
    mongo.find(result => {
        res.status(200).send(result);
    });
});

router.get('/mongo/:table/near/:lat/:long/:dist', function(req, res, next) {

    mongo.findNear(req.params.table, req.params.lat, req.params.long, req.params.dist, result => {
        if(req.query.map === "true"){
            res.render('map', {
                title: "Express API", // Give a title to our page
                jsonData: result // Pass data to the View
            });
        } else {
            res.status(200).send(result);
        }
    });
});

module.exports = router;
