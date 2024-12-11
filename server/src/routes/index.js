const router = require("express").Router();
const SynchronizationRoutes = require("./SynchronizationRoutes");
const AuthrizationRoutes = require("./AuthorizationRoutes");
const ScheduleRoutes = require("./ScheduleRoutes");

router.use(SynchronizationRoutes);
router.use(AuthrizationRoutes);
router.use(ScheduleRoutes);

module.exports = router;