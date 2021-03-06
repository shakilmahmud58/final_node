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
   isBestAchived:{
    type:Boolean,
    required:true
   },
   date:{
       type:String,
       required: true
   },
   origin:{
    type:String,
    required:false
}
})

const Products = mongoose.model("Products", ProductsSchema);

module.exports= Products;