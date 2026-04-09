const express=require('express');
const {registerController,loginController, currentController} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const Router=express.Router();
Router.post('/register',registerController)
Router.post('/login',loginController)
Router.get('/current-user',authMiddleware,currentController)
module.exports=Router 