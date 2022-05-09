const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   name:{
       type:String,
       required:true,
       trim: true
   },
   email:{
       type: String,
       required: true,
       trim: true,
       lowercase: true
   },
   password:{
       type: String,
       required: true,

   },
   role:{
       type:String,
       required: true
   }
})

const User = mongoose.model("User", UserSchema);

module.exports= User;