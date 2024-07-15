const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = 5000;
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Routers
const eventRouter = require('./Routes/EventRoutes');
const newsRouter = require('./Routes/NewsRoutes');
const scheduleRouter = require('./Routes/ScheduleRoutes');
const uploadRouter = require('./Routes/GalleryRoutes');
const scoreRouter = require('./Routes/ScoreRoutes');
const roleRouter = require('./Routes/RoleRoutes');

// MongoDB Connection
mongoose.connect('mongodb+srv://arshathhaseen:1234@cluster0.4ahayis.mongodb.net/SportManagementSystem', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api/event', eventRouter);
app.use('/api/news', newsRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/role', roleRouter);
app.use('/api/sports', scoreRouter);
app.use(uploadRouter);

// Attach io instance to app for route handlers
app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
