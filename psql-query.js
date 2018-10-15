var path = require('path');

function findAll(table){
    return "SELECT row_to_json(fc) FROM ( \n" +
        "\tSELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features \n" +
        "\tFROM (\n" +
        "\t\tSELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((lg.\"Location\", lg.\"Description\", lg.\"time\")) As properties \n" +
        "\t\tFROM \"" + table + "\" As lg\n" +
        "\t) As f \n" +
        ") As fc ";
}

function findNear(table, lat, lng, meters){
    return "SELECT row_to_json(fc) FROM ( \n" +
        "\tSELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features \n" +
        "\tFROM (\n" +
        "\t\tSELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((lg.\"Location\", lg.\"Description\", lg.\"time\")) As properties \n" +
        "\t\tFROM \"" + table + "\" As lg\n" +
        "WHERE ST_Distance_Sphere(lg.geom, ST_MakePoint("+lng+","+lat+")) <= "+ meters +"" +
        "\t) As f \n" +
        ") As fc ";
}

function insertToAccessToURL(ip, lat, lng){
    return "insert into accessToURL(ip, lat, lng, \"timestamp\") values ('"+ip+"',"+lat+","+lng+",(select now()))";
   //return "insert into accessToURL(ip, lat, lng) values ('$1',$2,$3)";
}

//insert into accessToURL(ip, lat, lng) values ('127.0.0.1',10.0,10.0)

module.exports = {
    findAll: findAll,
    findNear: findNear,
    insertToAccessToURL: insertToAccessToURL
};