const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const Userdb = require('../models/User');


exports.create = async(req, res)=>{
    const role ={role:"user"};
    const newUser = {...req.body, ...role}
    const user = new Userdb(newUser);
    await Userdb.exists({email:req.body.email}).then(async(result)=>{
        if(result==null)
        { 
          await user.save().then((data)=>{
             res.send({code:true});
          }).catch((err)=>{
              res.send(err);
          });
        }
        else
        {
            res.send({status:'This email is taken',code:false});
        }
    })
}

exports.login= async(req,res)=>{
    //const user = req.body;
    await Userdb.findOne({email:req.body.email, password:req.body.password}).then((result)=>{
        if(result==null)
        {
            res.send({status:"No account exist for this credential",code:false})
        }
        else
        {
           const payload={email:result.email, role:result.role}
           const token = jwt.sign(payload, process.env.SECRET,{ expiresIn: '2h'});
           res.send({token,code:true, role:result.role});
        }
    }).catch((err)=>{
        res.send(err);
    });
}

exports.verify=(req,res)=>{
    //console.log(req.decoded);
    res.send(req.decoded);
}