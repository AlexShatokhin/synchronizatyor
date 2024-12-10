const router = require("express").Router();
const SynchronizationRoutes = require("./SynchronizationRoutes");

router.use(SynchronizationRoutes);

module.exports = router;