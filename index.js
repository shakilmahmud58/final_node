const express = require("express");
const cors = require('cors');

const {createServer} = require('http');
// const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser');
const app = express();
app.use(cors());
const httpServer = createServer(app);
const {Server} = require('socket.io')
const io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"]

    }
})

 app.get('/get',(req,res)=>{ res.send('ok')})
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
       console.log(message);
       console.log('from socket edit event');
       io.emit('editback',message);
   })
})


const port = process.env.PORT || 5000;
httpServer.listen(port,()=>{
    console.log("Listening at 5000");
})