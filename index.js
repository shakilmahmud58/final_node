const express = require("express");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const { connectDB } = require('./connections/database');
require('dotenv').config();
const morgan = require('morgan');
app.use(morgan('tiny'));

const router = require('./routes/route')

connectDB();

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Listening at 5000");
})