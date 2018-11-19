# Instrucciones:

### Ir a la carpeta geo-files donde estan los geoJsons compactos.

### O descargarse los geojson y `jq` y correr

```
jq --compact-output ".features" conseguiTarjeta.geojson > conseguiTarjetaCompact.geojson

jq --compact-output ".features" cargaTuTarjeta.geojson > cargaTuTarjetaCompact.geojson

jq --compact-output ".features" realizaGestiones.geojson > realizaGestionesCompact.geojson

jq --compact-output ".features" registraTuTarjeta.geojson > registraTuTarjetaCompact.geojson
```



### Luego correr para importar los archivos a mongo (obviamente lo tenes que tener instalado y corriendo el servicio)
```
mongoimport --db sube -c sube --file "conseguiTarjetaCompact.geojson" --jsonArray

mongoimport --db sube -c sube --file "cargaTuTarjetaCompact.geojson" --jsonArray

mongoimport --db sube -c sube --file "realizaGestionesCompact.geojson" --jsonArray

mongoimport --db sube -c sube --file "registraTuTarjetaCompact.geojson" --jsonArray

mongoimport --db sube -c sube --file "consultaSaldoCompact.geojson" --jsonArray
```

```
mongoimport --db sube -c sube2dIndex --file "conseguiTarjetaCompact.geojson" --jsonArray

mongoimport --db sube -c sube2dIndex --file "cargaTuTarjetaCompact.geojson" --jsonArray

mongoimport --db sube -c sube2dIndex --file "realizaGestionesCompact.geojson" --jsonArray

mongoimport --db sube -c sube2dIndex --file "registraTuTarjetaCompact.geojson" --jsonArray

mongoimport --db sube -c sube2dIndex --file "consultaSaldoCompact.geojson" --jsonArray
```

### Entrar a mongo

```
mongo
```

### Cambiar la db a sube

```
use sube
```

### Crear los indices sphear2d sobre los points

```
db.sube.createIndex( { geometry : "2dsphere" } )
db.sube2dIndex.createIndex( { "geometry.coordinates" : "2d" } )
```

### Probar que todo anda bien con esta query

```
db.sube.find(
   {
     geometry:
       { $near:
          {
            $geometry: { type: "Point",  coordinates: [ -58.463379,-34.556003 ] },
            $minDistance: 0,
            $maxDistance: 5000
          }
       }
   }
)
```

```
db.sube2dIndex.find(
   {
     "geometry.coordinates":
       { $near: [ -58.463379,-34.556003 ],
         $maxDistance: 0.01
       }
   }
)
```

### Deberia devolver algo asi:
```
 "_id" : ObjectId("5bc329fea7ee6cbd7363bbd8"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46359, -34.55601 ] }, "properties" : { "EmpresaId" : "35146|2", "Location" : "AV. CONGRESO 2516", "Description" : "ROMANO ARIEL", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "NUÑEZ", "calification" : 5, "BranchType" : "AGENCIA DE LOTERÍA" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363e340"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46322, -34.55574 ] }, "properties" : { "EmpresaId" : "56954|2", "Location" : "AV. CONGRESO 2463", "Description" : "GONZALO ZITO FEIJOO", "Type" : 2, "time" : "07:00 A 21:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363cd0b"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46431, -34.55635 ] }, "properties" : { "EmpresaId" : "44619|2", "Location" : "AV CONGRESO 2594", "Description" : "KIOSCO \"VALENTINO\"", "Type" : 2, "time" : "00:00 A 23:59 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363e376"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46248, -34.55646 ] }, "properties" : { "EmpresaId" : "59964|5", "Location" : "MANUEL UGARTE 2439", "Description" : "EL 46", "Type" : 5, "time" : "07:00 A 23:59 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363a91d"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.4625, -34.55548 ] }, "properties" : { "EmpresaId" : "22394|2", "Location" : "AV. CABILDO 2900", "Description" : "SUBTE LINEA D EST CONGRESO", "Type" : 5, "time" : "05:00 A 22:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "ESTACIÓN DE SUBTE" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363ba54"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46219, -34.55556 ] }, "properties" : { "EmpresaId" : "35357|5", "Location" : "AV. CABILDO 2883", "Description" : "DAME ALEJANDRO", "Type" : 5, "time" : "00:01 A 23:59 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363c183"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46272, -34.55507 ] }, "properties" : { "EmpresaId" : "38886|2", "Location" : "AV. CABILDO 2917", "Description" : "FARMACIAS DEL DR AHORRO", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "NUÑEZ", "calification" : 5, "BranchType" : "FARMACIA" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363f06a"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46212, -34.55565 ] }, "properties" : { "EmpresaId" : "58984|2", "Location" : "CABILDO AV. 2883", "Description" : "ALEJANDRO DAME", "Type" : 2, "time" : "09:00 A 22:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363b90b"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46207, -34.55629 ] }, "properties" : { "EmpresaId" : "35117|2", "Location" : "MANUEL UGARTE 2421", "Description" : "VELARDO PABLO ROQUE", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "AGENCIA DE LOTERÍA" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363df9a"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46353, -34.55485 ] }, "properties" : { "EmpresaId" : "49424|2", "Location" : "AV. CABILDO 2980", "Description" : "SHERON", "Type" : 5, "time" : "07:00 A 23:00 HS", "provincia" : "CF", "localidad" : "NUÑEZ", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363ba37"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.4622, -34.55533 ] }, "properties" : { "EmpresaId" : "35699|5", "Location" : "CONGRESO 2374", "Description" : "RIVA LAURA EDITH", "Type" : 5, "time" : "00:00 A 23:59 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363b40f"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46191, -34.55615 ] }, "properties" : { "EmpresaId" : "28022|2", "Location" : "AV. CABILDO 2808", "Description" : "BARO CRISTIAN GASTON", "Type" : 5, "time" : "08:00 A 23:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363c787"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46214, -34.55529 ] }, "properties" : { "EmpresaId" : "44369|2", "Location" : "AV. CONGRESO 2368", "Description" : "MOVILPIN 2", "Type" : 2, "time" : "07:00 A 22:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "LOCUTORIO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363a959"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46333, -34.55471 ] }, "properties" : { "EmpresaId" : "22434|2", "Location" : "AV. CABILDO 2978", "Description" : "PARANO JOSE LUIS", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "NUÑEZ", "calification" : 5, "BranchType" : "AGENCIA DE LOTERÍA" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363dfcb"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46212, -34.55717 ] }, "properties" : { "EmpresaId" : "55602|5", "Location" : "CIUDAD DE LA PAZ 2717", "Description" : "DULCES Y TINTOS", "Type" : 5, "time" : "09:00 A 20:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363ad7a"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46524, -34.55541 ] }, "properties" : { "EmpresaId" : "24404|2", "Location" : "AMENABAR 3002", "Description" : "MAIALE OSVALDO", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "NUÑEZ", "calification" : 5, "BranchType" : "AGENCIA DE LOTERÍA" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363b1e6"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46171, -34.55708 ] }, "properties" : { "EmpresaId" : "29595|2", "Location" : "RIVERA PEDRO IGNACIO DR. 2446", "Description" : "VALUSSI PAOLA SABRINA", "Type" : 2, "time" : "08:00 A 20:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363e2e7"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46142, -34.55668 ] }, "properties" : { "EmpresaId" : "50858|5", "Location" : "AV CABILDO 2710", "Description" : "MAXIKIOSCO", "Type" : 5, "time" : "07:00 A 20:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "KIOSCO" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363bc3b"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.46509, -34.55712 ] }, "properties" : { "EmpresaId" : "35120|2", "Location" : "MOLDES 2873", "Description" : "MUNDO NORMA ANUNCIADA", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "AGENCIA DE LOTERÍA" } }
{ "_id" : ObjectId("5bc329fea7ee6cbd7363bb66"), "type" : "Feature", "geometry" : { "type" : "Point", "coordinates" : [ -58.4615, -34.55704 ] }, "properties" : { "EmpresaId" : "36555|2", "Location" : "DR. PEDRO IGNACIO RIVERA 2430", "Description" : "FAZZIOLI CLAUDIA GRACIELA", "Type" : 2, "time" : "08:00 A 21:00 HS", "provincia" : "CF", "localidad" : "BELGRANO", "calification" : 5, "BranchType" : "AGENCIA DE LOTERÍA" } }
```

## Run scala hitter
```
sudo apt-get install scala
echo "deb https://dl.bintray.com/sbt/debian /" | sudo tee -a /etc/apt/sources.list.d/sbt.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2EE0EA64E40A89B84B2DF73499E82A75642AC823
sudo apt-get update
sudo apt-get install sbt
```
### Ir a la carpeta donde esta el proyecto (APiHitter) y correr
```
sbt "run 50 mongo coordinates.txt"
```
donde
  - 50 es la cantidad de request simultaneas
  - mongo es el engine (sino psql)
  - coordinates.txt es el archivo con todas las coordenadas a solicitar
Respetar las comillas
