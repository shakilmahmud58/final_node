const express = require('express')
const route = express.Router();

// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bodyParser= require('body-parser');
// app.use(cors());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
// const { User } = require('../models/User')

//const controller = require('../controllers/controller')
const Productcontroller = require('../controllers/productController')
const Usercontroller = require('../controllers/userController');
const Cartcontroller = require('../controllers/cartController');
const { verifyToken} = require('../middleware/authVerify')

//user
route.post('/addNewUser', Usercontroller.create);
route.post('/login', Usercontroller.login);

//product
route.get('/getProducts', Productcontroller.get);
route.post('/addProduct',verifyToken, Productcontroller.create);
route.post('/editProduct',verifyToken, Productcontroller.edit);
route.post('/deleteProduct',verifyToken, Productcontroller.delete);
route.post('/sortProducts', Productcontroller.sort);

//cart
route.post('/addToCart',verifyToken, Cartcontroller.create);
route.get('/getcartproducts',verifyToken, Cartcontroller.get);
route.post('/deletecartproducts',verifyToken, Cartcontroller.delete);

//verify
route.get('/tokenverify', verifyToken, Usercontroller.verify);

module.exports=route;