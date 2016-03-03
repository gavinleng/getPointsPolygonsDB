/*
 * Created by G on 18/02/2016.
 */


var log = require("debug")("pointsInPolygons");
var request = require('sync-request');
var geoDataInOut = require('nqm-geojson-tools');
var argv = require("minimist")(process.argv.slice(2));
var path = require("path");
var configData;

log("Start");
console.log("Start: " + new Date());

//get config
if (!argv.config) {
	log("no config file given - using defaults");
	configData = require("./geoConfig-PPDB");
} else {
	var configFile = path.resolve(argv.config);

	// Get the configuration.
	try {
	  configData = require(configFile || "./geoConfig-PPDB");
	} catch (err) {
	  console.log("failed to parse config file %s: %s", configFile, err.message);
	  process.exit(-1);
	}
}

//get url, id, outpath
if (!configData.pointsurl) {
    console.log("no pointsurl given");
    process.exit(-1);
 }
var pointsurl = configData.pointsurl;

if (!configData.polygonsurl) {
    console.log("no polygonsurl given");
    process.exit(-1);
 }
var polygonsurl = configData.polygonsurl;

if (!configData.polygonId) {
    console.log("no polygonId given");
    process.exit(-1);
 }
var polygonId = configData.polygonId;

if (!configData.outPathIn) {
    console.log("no outPathIn given");
    process.exit(-1);
 }
var outPathIn = configData.outPathIn;

var pointId;
if (configData.pointId) {
    pointId = configData.pointId;
}

var outPathOut;
if (configData.outPathOut) {
    outPathOut = configData.outPathOut;
}

log("Start get url data");
console.log("Start get url data: " + new Date());

//get points data
var pointsData = request('GET', pointsurl).getBody('utf8');
pointsData = JSON.parse(pointsData).data;
log("Got points data");
console.log("Got points data: " + new Date());

//get polygons data
var polygonsData = request('GET', polygonsurl).getBody('utf8');
polygonsData = JSON.parse(polygonsData).data;
log("Got polygon data");
console.log("Got polygon data: " +new Date());

var lenPolygons = polygonsData.length;

var i, polygon, pointsInOut, pointsIn, pointsOut;
var dataPIP = [];

var pointsCheck = pointsData;

log("Start to find points in polygons");
console.log("Start to find points in polygons: " + new Date());

for (i = 0; i < lenPolygons; i++) {
    log("checking points in the polygon" + (i + 1) + "/" + lenPolygons);
    polygon = polygonsData[i];

    if (pointId) {
        pointsInOut = geoDataInOut.getPointsInPolygon(polygon, pointsCheck, pointId);
    } else {
        pointsInOut = geoDataInOut.getPointsInPolygon(polygon, pointsCheck);
    }

    pointsIn = pointsInOut[0];
    pointsOut = pointsInOut[1];

    dataPIP.push({
        "polygonId": polygon.properties[polygonId],
        "pointsIn": pointsIn
    });

    pointsCheck = pointsOut;
}

log("Got points in polygons");
console.log("Got points in polygons: " + new Date());

geoDataInOut.jsonSave({
    "type": "geoPointsInPolygons",
    "data": dataPIP
}, outPathIn);
log("Saved geoPointsInPolygons data");
console.log("Saved geoPointsInPolygons data: " + new Date());

if (outPathOut) {
	geoDataInOut.jsonSave({
	    "type": "geoPointsOutPolygons",
	    "data": pointsOut
	}, outPathOut);
	log("Saved geoPointsOutPolygons data");
	console.log("Saved geoPointsOutPolygons data: " + new Date());
}

log("End");
console.log("End: " + new Date());
