const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const eventRouter = require('./Routes/EventRoutes')

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://arshathhaseen:1234@cluster0.4ahayis.mongodb.net/SportManagementSystem');
app.use('/api/event',eventRouter)




app.listen(port, () => {
    console.log(`App running on ${port}`);
});