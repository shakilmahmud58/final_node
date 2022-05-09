const mongoose = require('mongoose');
require('dotenv').config();
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;

const url = `mongodb+srv://${user}:${password}@cluster0.shiwe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//const client = new MongoClient(url);

const connectDB=async()=>{
    try {
        await mongoose.connect(url);
        console.log("success");
    } catch (error) 
    {
      console.log(error);
    }
}


module.exports={connectDB};
