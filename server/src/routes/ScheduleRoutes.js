const router = require("express").Router();
const ScheduleController = require("../controllers/ScheduleController");

router.post("/schedule", ScheduleController.setSchedule);

module.exports = router;