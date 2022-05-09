const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
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
   },
   date:{
       type:String,
       required: true
   }
})

const Products = mongoose.model("Products", ProductsSchema);

module.exports= Products;