const Event = require('../Model/EventSchema');

const getEvent = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } }).sort({ date: 'asc' });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const postEvent = async (req, res) => {
  const { title, sportName, date, teamA, teamB } = req.body;

  try {
    const newEvent = new Event({ title, sportName, date, teamA, teamB });
    await newEvent.save();

    const io = req.app.get('io');
    io.emit('eventUpdated');

    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deletedEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const io = req.app.get('io');
    io.emit('eventUpdated');

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updatedEvent = async (req, res) => {
  const eventId = req.params.id;
  const { title, sportName, date, teamA, teamB } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, sportName, date, teamA, teamB },
      { new: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const io = req.app.get('io');
    io.emit('eventUpdated');

    res.json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEvent,
  postEvent,
  deletedEvent,
  updatedEvent,
};
