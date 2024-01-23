const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const eventRouter = require('./Routes/EventRoutes')
const NewsRoute = require('./Routes/NewsRoutes')
const scheduleRouter = require('./Routes/ScheduleRoutes');
const UploadRoute = require("./Routes/GallaryRoutes");
const RoleRoute = require('./Routes/RoleRoutes')
const sportRouter = require("./Routes/ScoreRoutes")
mongoose.connect('mongodb+srv://arshathhaseen:1234@cluster0.4ahayis.mongodb.net/SportManagementSystem');


// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/event',eventRouter)
app.use('/api/news',NewsRoute)
app.use('/schedules', scheduleRouter);
app.use('/api/role',RoleRoute)
app.use(UploadRoute);
app.use('/api', sportRouter);
app.listen(port, () => {
    console.log(`App running on ${port}`);
});