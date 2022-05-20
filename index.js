const express = require("express");
const cors = require('cors');
const {createServer} = require('http');
const {Server} = require('socket.io')
// const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser');
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:"https://angular-58.azurewebsites.net"
    }
})


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const { connectDB } = require('./connections/database');
require('dotenv').config();
const morgan = require('morgan');
app.use(morgan('tiny'));

const router = require('./routes/route')

connectDB();

app.use(router);

io.on("connection",(socket)=>{
   console.log("socket");
   socket.on('edit',(message)=>{
       //console.log(message);
       io.emit('editback',message);
   })
})


const port = process.env.PORT || 5000;
httpServer.listen(port,()=>{
    console.log("Listening at 5000");
})