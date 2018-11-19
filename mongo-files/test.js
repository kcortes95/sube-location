conn = new Mongo();
db = conn.getDB("sube");
startTime = new Date();
var i;
var notZero = 0;
var cursor = db.localidades.find();
cursor.forEach(function( aRow ) {

	count = db.sube.count(
	   {
	     geometry:
	       { $near:
	          {
	            $geometry: aRow.geometry,
	            $minDistance: 0,
	            $maxDistance: 500
	          }
	       }
	   }
	);

    db.localidades.update(
        { _id: aRow._id }, 
        { "$set": { "sube": count } }
    );
});
/*for (i = 0; i < data.features.length; i++) { 
 	long = data.features[i].geometry.coordinates[0];
 	lat = data.features[i].geometry.coordinates[1];
	/*count = db.sube.count(
	   {
	     geometry:
	       { $near:
	          {
	            $geometry: { type: "Point",  coordinates: [ long, lat ] },
	            $minDistance: 0,
	            $maxDistance: 500
	          }
	       }
	   }
	);
	count = db.sube2dIndex.count(
	   {
	   	"geometry.coordinates":
	     {
	     	$near: [ long, lat ],
	     	$maxDistance: 0.01
	     }
	   }
	);
	//count = db.sube2dIndex.count();
	if(count != 0)
		notZero++;
	print(count);	
}*/
  endTime = new Date();
  var timeDiff = endTime - startTime;
  print("No son 0 -> " + notZero);
  print("Tiempo total: " + timeDiff);

