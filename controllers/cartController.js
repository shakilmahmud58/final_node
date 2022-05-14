const { ObjectId } = require('mongodb');
const Cartdb = require('../models/cart');
const Productsdb = require('../models/Products');

exports.create = async(req,res)=>{
    const email = req.decoded.email;
    const cartProduct ={...req.body, email}
    const productId = req.body.productId;
    console.log(productId);
    const Product = new Cartdb(cartProduct);

    await Product.save().then(async(result)=>{
        await Productsdb.findByIdAndUpdate(productId,{isBestAchived:true});
        res.send(result);
        }).catch(err=>{
                res.send(err);
            });
}

exports.get=(req,res)=>{
    const email = req.decoded.email;
    //console.log(email);
    Cartdb.find({email:email}).then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })    
}

exports.delete= async(req,res)=>{
    const id = req.body._id;
    const productId = req.body.pid;
    //console.log(productId);
    await Cartdb.findByIdAndDelete(id).then(async(result1)=>{
        await Cartdb.exists({productId:productId}).then(async(result2)=>{
           if(result2==null)
              await Productsdb.findByIdAndUpdate(productId,{isBestAchived:false});
        });
        // if(cartItem==null)
        // {
        //    
        // }
        res.send(result1);
    }).catch(err=>{
        res.send(err);
    })
}
