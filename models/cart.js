const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    productId:{
        type: String,
        required: true,
    },
   name:{
       type: String,
       required: true,
       trim: true,
       lowercase: true
   },
   code:{
       type: String,
       required: true,

   },
   category:{
       type:String,
       required: true
   },
   number:{
    type:Number,
    required:true
   },
   price:{
       type:Number,
       required:true
   },
   description:{
       type:String,
       required:false
   },
   url:{
       type:String,
       required:false
   }
})

const Cart = mongoose.model("Cart", CartSchema);

module.exports= Cart;