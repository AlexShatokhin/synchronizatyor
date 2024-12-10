const routes = require("express").Router();
const DatabaseController = require("../controllers/DatabaseController");
const SerializationController = require("../controllers/SerializationController");

routes.post("/mysql", DatabaseController.handleMySQL);
routes.post("/postgres", DatabaseController.handlePostgres);

routes.post("/json", SerializationController.handleJSON);
routes.post("/xml", SerializationController.handleXml);

module.exports = routes;

//TODO: mongoDB
//TODO: sqlite