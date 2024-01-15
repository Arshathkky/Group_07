const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://arshathhaseen:1234@cluster0.4ahayis.mongodb.net/SportManagementSystem');

// Middleware
app.use(cors());
app.use(express.json());



app.listen(port, () => {
    console.log(`App running on ${port}`);
});
