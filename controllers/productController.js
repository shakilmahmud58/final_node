const { ObjectId } = require('mongodb');
const Productsdb = require('../models/Products');

exports.create = async(req,res)=>{
    console.log(req.decoded);
    const role =req.decoded.role;
    const isbestachived = {isBestAchived:false}
    const data = {...req.body,...isbestachived}
    if(role=='admin')
    {
        
        await Productsdb.exists({name:req.body.name, code:req.body.code}).then(async(result)=>{
    
            if(result==null)
                {
                    const Product = new Productsdb(data);
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
    await Productsdb.find({}).sort({price:'asc'}).then((result)=>{
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

exports.edit= async(req,res)=>{
    const id = req.body.id;
    await Productsdb.findByIdAndUpdate(id,req.body.data).then(result=>{
        res.send(result);
    }).catch(err=>{
        res.send(err);
    })
}

exports.sort= async(req,res)=>{
    const sortBy = req.body.sort;
    const orderBy = req.body.order;
    const query ={};
    query[sortBy]=orderBy;
    await Productsdb.find({}).sort(query).then((result)=>{
        res.send(result);
     }).catch(err=>{
         res.send(err);
     })
}