const express = require('express');
const router = express.Router();
const EventController = require('../Controller/EventController');

router.get('/getEvent', EventController.getEvent);
router.post('/addEvent', EventController.postEvent);
router.put('/updateEvent/:id', EventController.updatedEvent);
router.delete('/deleteEvent/:id', EventController.deletedEvent);

module.exports = router;
