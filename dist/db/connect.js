"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectToDB = void 0;
var mongodb_1 = require("mongodb");
var connection_str = process.env.ATLAS_URI;
var client = new mongodb_1.MongoClient(connection_str);
var _db;
function connectToDB(cb) {
    client.connect(function (err, db) {
        if (db) {
            _db = db.db("employeeRecorder");
            console.log("Connected to MongoDB successfully");
        }
        return cb(err);
    });
}
exports.connectToDB = connectToDB;
function getDb() {
    return _db;
}
exports.getDb = getDb;
