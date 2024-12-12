const router = require("express").Router();
const AuthorizationController = require("../controllers/AuthorizationController");

router.post("/login", AuthorizationController.login);
router.post("/register", AuthorizationController.register);
router.post("/logout", AuthorizationController.logout);

module.exports = router;