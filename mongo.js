var db;

function findNear(lat, long, dist, callback) {
    // Get the documents collection
    const collection = db.collection("sube");
    // Find some documents
    collection.find(
        { 'geometry':
                { $near :
                        { $geometry:
                                { type: "Point",  coordinates: [ parseFloat(long), parseFloat(lat) ] },
                            $maxDistance: parseFloat(dist)
                        }
                }
        }
    ).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

// use the findDocuments() function
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'sube';

const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db = client.db(dbName);
});

module.exports = {
  findNear: findNear,
    mongobd: db
};