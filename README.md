# getPointsPolygonsDB

There are two javascript programmes for getting the database of geojson points data in geojson polygons/multipolygons.

pointsInPolygons.js: Checking the points in polygons, based on the entire geojson points dataset.
bboxPointsInPolygons.js: Checking the points in polygons, based on the geojson points data in the bounding box of each polygon.

## Usage

Running with a default configuration file, geoConfig-PPDB.js or geoConfig-PPDB-BBox.js

```javascript
DEBUG=* node pointsInPolygons.js

DEBUG=* node bboxPointsInPolygons.js
```

An example of the configuration file for pointsInPolygons.js, myconfig.js, likes

```javascript
"use strict";

module.exports = {
    "pointsurl": 'http://q.nqminds.com/v1/datasets/aaaaaaaaaa/data?opts={"limit":159062}&proj={"type":1,"properties.UN_UNIT":1,"geometry.type":1,"geometry.coordinates":1,"_id":0}',
    "polygonsurl": 'http://q.nqminds.com/v1/datasets/bbbbbbbbbb/data?opts={"limit":832}&proj={"type":1,"properties.LSOA11CD":1,"geometry.type":1,"geometry.coordinates":1,"_id":0}',
    "polygonId": "LSOA11CD",
    "outPathIn": "./data/geoPointsInPolygons.json"
    //, "pointId": "UN_UNIT"
    //, "outPathOut": "./data/geoPointsOutPolygons.json"
};
```

An example of the configuration file for bboxPointsInPolygons.js, myconfigBBox.js, likes

```javascript
"use strict";

module.exports = {
    "pointsurl": 'http://q.nqminds.com/v1/datasets/aaaaaaaaaa/data?opts={"limit":159062}&proj={"type":1,"properties.UN_UNIT":1,"geometry.type":1,"geometry.coordinates":1,"_id":0}',
    "polygonsurl": 'http://q.nqminds.com/v1/datasets/bbbbbbbbbb/data?opts={"limit":832}&proj={"type":1,"properties.LSOA11CD":1,"geometry.type":1,"geometry.coordinates":1,"_id":0}',
    "polygonId": "LSOA11CD",
    "outPathIn": "./data/geoPointsInPolygonsbbox.json"
    //, "pointId": "UN_UNIT"
};
```

Running with a configuration file

```javascript
DEBUG=* node pointsInPolygons.js --config myconfig.js

DEBUG=* node bboxPointsInPolygons.js --config myconfigBBox.js
```

The formation of the created database is

```json
{
    "type": "geoPointsInPolygons",
    "data": [
        {
            "polygonId": "E01022660",
            "pointsIn": []
        },
        {
            "polygonId": "E01022661",
            "pointsIn": []
        }
    ]
}
```
If "pointId" is given in the configuration file, "pointsIn" is an array of point's IDs. Or, "pointsIn" is an array of the geojson points data.