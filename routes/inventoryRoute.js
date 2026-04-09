const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController } = require('../controllers/inventoryController');
const Router=express.Router()
Router.post('/create-inventory',authMiddleware,createInventoryController)
module.exports=Router