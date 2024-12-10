const router = require("express").Router();
const AuthorizationController = require("../controllers/AuthorizationController");

router.post("/login", AuthorizationController.login);
router.post("/register", AuthorizationController.register);

module.exports = router;