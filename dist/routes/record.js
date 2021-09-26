"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordRoutes = void 0;
var express_1 = __importDefault(require("express"));
var mongodb_1 = require("mongodb");
var connect_1 = require("../db/connect");
exports.recordRoutes = express_1.default.Router();
var COLLECTION_NAME = "employees";
// GET the list of all records
exports.recordRoutes.get("/record", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                db = connect_1.getDb();
                return [4 /*yield*/, db.collection(COLLECTION_NAME).find({}).toArray()];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// GET one record
exports.recordRoutes.get("/record/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, record_id, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                db = connect_1.getDb();
                record_id = new mongodb_1.ObjectId(req.params.id);
                return [4 /*yield*/, db
                        .collection(COLLECTION_NAME)
                        .findOne({ _id: record_id })];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: error_2 === null || error_2 === void 0 ? void 0 : error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST a record
exports.recordRoutes.post("/record", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, error, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                db = connect_1.getDb();
                error = {};
                if (!req.body.first_name)
                    error.first_name = "Firstname is required";
                if (!req.body.last_name)
                    error.last_name = "Lastname is required";
                if (!req.body.role)
                    error.role = "role is required";
                if (Object.keys(error).length)
                    return [2 /*return*/, res.status(400).json({ error: error })];
                return [4 /*yield*/, db.collection(COLLECTION_NAME).insertOne(req.body)];
            case 1:
                result = _a.sent();
                res.status(201).json(__assign(__assign({}, req.body), { _id: result.insertedId }));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// PATCH a record
exports.recordRoutes.patch("/record/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var record_id, db, error, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                record_id = req.params.id;
                db = connect_1.getDb();
                error = {};
                if (req.body.first_name === "")
                    error.first_name = "Firstname is required";
                if (req.body.last_name === "")
                    error.last_name = "Lastname is required";
                if (req.body.role === "")
                    error.role = "Role is required";
                if (Object.keys(error).length)
                    return [2 /*return*/, res.status(400).json({ error: error })];
                return [4 /*yield*/, db
                        .collection(COLLECTION_NAME)
                        .updateOne({ _id: new mongodb_1.ObjectId(record_id) }, { $set: req.body })];
            case 1:
                _a.sent();
                res.status(200).json(__assign(__assign({}, req.body), { _id: record_id }));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// DELETE a record
exports.recordRoutes.delete("/record/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var record_id, db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                record_id = req.params.id;
                db = connect_1.getDb();
                return [4 /*yield*/, db
                        .collection(COLLECTION_NAME)
                        .deleteOne({ _id: new mongodb_1.ObjectId(record_id) })];
            case 1:
                _a.sent();
                res.status(200).send("Deleted the resource successfully");
                return [2 /*return*/];
        }
    });
}); });
