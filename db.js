var config = require('./config_db');
var query = require('./psql-query');

const { Client, Query } = require('pg');
var conString = "postgres://"+config.postgres.username+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.database; // Your Database Connection

function doQuery(query, callback){
    var client = new Client(conString);

    client.connect();
    var query = client.query(new Query(query));
    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        var data = result.rows[0].row_to_json.features; // Save the JSON as variable data
        callback(data);
    });

}

//https://node-postgres.com/features/queries
function doInsert(query, callback){
    const client = new Client(conString);
    client.connect();

    client.query(query, (err, res) => {
        console.log("alallala");
        if (err) {
            console.log(err.stack);
        } else {
            callback(res.rows[0]);
        }
    });
}

function getTopIP(callback){
    const client = new Client(conString);
    client.connect();

    client.query(query.getTopIP(), (err, res) => {
        console.log("Entro a getTopIP");
        if (err) {
            console.log(err.stack);
        } else {
            callback(res.rows);
        }
    });
}

module.exports = {
    doQuery: doQuery,
    doInsert: doInsert,
    getTopIP: getTopIP
};

