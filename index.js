require('dotenv').config();
const mongoose = require('mongoose');

// connecting mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/user-roles-permission");

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

const port = process.env.SERVER_PORT || 3000;

app.listen(port, ()=>{
    console.log("Server is running on port:- "+port);
});