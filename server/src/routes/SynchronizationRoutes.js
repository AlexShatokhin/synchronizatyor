const routes = require("express").Router();
const DatabaseController = require("../controllers/DatabaseController");
const LogsController = require("../controllers/LogsController");
const SerializationController = require("../controllers/SerializationController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

routes.get("/mysql", ensureAuthenticated, DatabaseController.getMySQL);
routes.post("/mysql", ensureAuthenticated, DatabaseController.handleMySQL);

routes.get("/postgres", ensureAuthenticated, DatabaseController.getPostgres);
routes.post("/postgres", ensureAuthenticated, DatabaseController.handlePostgres);

routes.get("/json", ensureAuthenticated, SerializationController.getJSON);
routes.post("/json", ensureAuthenticated, SerializationController.handleJSON);

routes.get("/xml", ensureAuthenticated, SerializationController.getXML);
routes.post("/xml", ensureAuthenticated, SerializationController.handleXML);

routes.get("/logs", ensureAuthenticated, LogsController.getLogs);

module.exports = routes;

//TODO: mongoDB
//TODO: sqlite