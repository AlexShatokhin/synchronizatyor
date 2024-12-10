const routes = require("express").Router();
const DatabaseController = require("../controllers/DatabaseController");
const SerializationController = require("../controllers/SerializationController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.post("/mysql", ensureAuthenticated, DatabaseController.handleMySQL);
routes.post("/postgres", ensureAuthenticated, DatabaseController.handlePostgres);

routes.post("/json", ensureAuthenticated, SerializationController.handleJSON);
routes.post("/xml", ensureAuthenticated, SerializationController.handleXml);

module.exports = routes;

//TODO: mongoDB
//TODO: sqlite