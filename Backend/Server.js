const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
<<<<<<< HEAD
const eventRouter = require('./Routes/EventRoutes')
=======

mongoose.connect('mongodb+srv://arshathhaseen:1234@cluster0.4ahayis.mongodb.net/SportManagementSystem');
>>>>>>> 32e0bde5bd9c2ea3dd807fbe58c1af4a389ed9cf

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// MongoDB connection
mongoose.connect('mongodb+srv://arshathhaseen:1234@cluster0.4ahayis.mongodb.net/SportManagementSystem');
app.use('/api/event',eventRouter)


=======
>>>>>>> 32e0bde5bd9c2ea3dd807fbe58c1af4a389ed9cf


app.listen(port, () => {
    console.log(`App running on ${port}`);
});