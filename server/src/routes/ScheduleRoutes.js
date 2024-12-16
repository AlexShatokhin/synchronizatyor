const router = require("express").Router();
const ScheduleController = require("../controllers/ScheduleController");

router.get("/schedule", ScheduleController.getSchedule);
router.post("/schedule", ScheduleController.setSchedule);
router.delete("/schedule", ScheduleController.removeSchedule);

module.exports = router;