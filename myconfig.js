/*
 * Created by G on 18/02/2016.
 */


"use strict";

module.exports = {
    "pointsurl": 'http://q.nqminds.com/v1/datasets/41-CCIo4wl/data?opts={"limit":159062}&proj={"type":1,"properties.UN_UNIT":1,"geometry.type":1,"geometry.coordinates":1,"_id":0}',
    "polygonsurl": 'http://q.nqminds.com/v1/datasets/VkWMEKfutx/data?opts={"limit":832}&proj={"type":1,"properties.LSOA11CD":1,"geometry.type":1,"geometry.coordinates":1,"_id":0}',
    "polygonId": "LSOA11CD",
    "outPathIn": "./data/geoPointsInPolygonsc.json"
    //, "pointId": "UN_UNIT"
    , "outPathOut": "./data/geoPointsOutPolygonsc.json"
};
