const express=require('express');
const { testcontroller } = require('../controllers/tetscontroller');
const router=express.Router();
Router.get('/test',testcontroller)
module.exports=router