"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var connect_1 = require("./db/connect");
var record_1 = require("./routes/record");
var port = process.env.PORT || 3001;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(record_1.recordRoutes);
app.listen(port, function () {
    connect_1.connectToDB(function (err) {
        if (err)
            console.error("Failed to connect to mongodb: ", err);
    });
    console.log("Server is up and running on port:", port);
});
