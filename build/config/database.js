"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MONGO_USERNAME = process.env.MONGO_USERNAME || "root";
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
var MONGO_HOST = process.env.MONGO_URL || "localhost";
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
var SERVER_PORT = process.env.SERVER_PORT || 27017;
var DATABASE_NAME = process.env.MONGO_DATABASE || "test";
var MONGO_STRING_CONNECT = process.env.MONGO_STRING_CONNECT || "";
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    dbName: DATABASE_NAME,
};
var MONGO = {
    host: MONGO_HOST,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    options: MONGO_OPTIONS,
    url: MONGO_STRING_CONNECT,
    dbName: DATABASE_NAME,
};
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};
var database = {
    mongo: MONGO,
    server: SERVER,
};
exports.default = database;
