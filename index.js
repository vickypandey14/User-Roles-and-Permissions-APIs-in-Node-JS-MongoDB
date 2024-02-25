require('dotenv').config();
const mongoose = require('mongoose');

// connecting mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/user-roles-permission");

const connection = mongoose.connection

connection.on("connected", () => {
    console.log("Connected to Database.");
})

connection.once("error", (err) => {
    console.log("Error while connecting mongo db:", err);
})

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

// Auth Routes

const authRoute = require('./routes/authRoute');
app.use('/api', authRoute);

// admin routes

const adminRoute = require('./routes/adminRoute');
app.use('/api/admin', adminRoute);

// common routes

const commonRoute = require('./routes/commonRoute');
app.use('/api', commonRoute);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port:- "+port);
});