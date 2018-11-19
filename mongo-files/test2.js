conn = new Mongo();
db = conn.getDB("sube");
startTime = new Date();
var i;
var notZero = 0;
var cursor = db.localidades.find();
cursor.forEach(function( aRow ) {
    count = db.sube2dIndex.count(
        {
            "geometry.coordinates":
                {
                    $near: [ aRow.geometry.coordinates[0], aRow.geometry.coordinates[1]],
                    $maxDistance: 0.005
                }
        }
    );

    db.localidades.update(
        { _id: aRow._id }, 
        { "$set": { "sube": count } }
    );
});

  endTime = new Date();
  var timeDiff = endTime - startTime;
  print("Tiempo total: " + timeDiff);

