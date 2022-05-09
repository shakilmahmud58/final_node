const { ObjectId } = require('mongodb');
const Productsdb = require('../models/Products');

exports.create = async(req,res)=>{
    console.log(req.decoded);
    const role =req.decoded.role;
    if(role=='admin')
    {
        const Product = new Productsdb(req.body);
        await Productsdb.exists({name:req.body.name, code:req.body.code}).then(async(result)=>{
    
            if(result==null)
                {
                    await Product.save().then((result)=>{
                        res.send(result);
                    }).catch(err=>{
                        res.send(err);
                    });
                }
                else
                {
                    res.send({msg:'same name and code is used previouly'});
                }
        })
    }
    else
    {
        res.send({msg:"your have no access to this"});
    }
}


exports.get= async(req,res)=>{
    await Productsdb.find({}).then((result)=>{
       res.send(result);
    }).catch(err=>{
        res.send(err);
    })
}

exports.delete= async(req,res)=>{
    const id = req.body._id;
    await Productsdb.findByIdAndDelete(id).then((result)=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
}