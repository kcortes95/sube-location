conn = new Mongo();
db = conn.getDB("sube");
result = db.sube.find(
   {
     geometry:
       { $near:
          {
            $geometry: { type: "Point",  coordinates: [ long, lat ] },
            $minDistance: 0,
            $maxDistance: 5000
          }
       }
   }
);
while ( result.hasNext() ) {
   result.next();
}
