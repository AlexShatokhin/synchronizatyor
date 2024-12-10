const router = require("express").Router();
const SynchronizationRoutes = require("./SynchronizationRoutes");
const AuthrizationRoutes = require("./AuthorizationRoutes");

router.use(SynchronizationRoutes);
router.use(AuthrizationRoutes);

module.exports = router;