const express = require('express');
const router = express.Router();
const scheduleController = require('../Controller/ScheduleController');

// Routes for handling schedules
router.get('/', scheduleController.getAllSchedules);
router.post('/add',scheduleController.addSchedules);
router.put('/update/:id',scheduleController.updateSchedule);
router.delete('/:id',scheduleController.deleteSchedule);

module.exports = router;