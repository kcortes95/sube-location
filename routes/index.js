var express = require('express');
const db = require('../db');
const mongo = require('../mongo');

const { Client, Query } = require('pg');

// Setup connection
var username = "gis"; // sandbox username
var password = "gis"; // read only privileges on our table
var host = "localhost:5432";
var database = "gis"; // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', function (req, res) {
    var client = new Client(conString);
    var query = "SELECT row_to_json(fc) FROM ( \n" +
        "\tSELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features \n" +
        "\tFROM (\n" +
        "\t\tSELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((id, lg.\"EmpresaId\")) As properties \n" +
        "\t\tFROM \"realizaGestiones\" As lg\n" +
        "\t) As f \n" +
        ") As fc ";

    client.connect();
    var query = client.query(new Query(query));
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    // Pass the result to the map page
    query.on("end", function (result) {
        var data = result.rows[0].row_to_json.features; // Save the JSON as variable data
        console.log(data);
        
        res.render('map', {
            title: "Express API", // Give a title to our page
            jsonData: data // Pass data to the View
        });

    });
});

router.get('/mongo', function(req, res, next) {
    mongo.find(result => {
        res.status(200).send(result);
    });
});

router.get('/:table/near/:lat/:long/:dist', function(req, res, next) {

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
