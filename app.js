const express = require('express');
const app = express();
const dataBaseInit = require("./lib/db/dataBaseInit");
const config = require('./lib/setting/config').config;
const serverPort = config.serverPort;
const mongoDBName = config.mongoDBName;
const server = require('http').createServer(app);
const serverUse=require('./lib/serverUse');
const authRestApi = require("./lib/rest_api/auth");
console.log(config)
dataBaseInit.mongoDBInit(mongoDBName);
serverUse.on(app);
authRestApi.on(app);
server.listen(process.env.PORT||serverPort);
console.log("現在使用" + serverPort + "port");