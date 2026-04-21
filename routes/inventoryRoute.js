const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController,getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getInventoryDonorController } = require('../controllers/inventoryController');
const Router=express.Router()
//Add Inventory
Router.post('/create-inventory',authMiddleware,createInventoryController)
//get all blood records
Router.get("/get-inventory",authMiddleware,getInventoryController)
//get All Donars Records
Router.get("/get-donars",authMiddleware,getDonarsController);
//Get All Hospital Records
Router.get("/get-hospitals",authMiddleware,getHospitalController);
//Get All Organisation Records
Router.get("/get-organisations",authMiddleware,getOrganisationController);
//Get Hospital Records for organisation
Router.get("/get-organisations-for-hospital",authMiddleware,getOrganisationForHospitalController);
//Get Hospital consumer Inventory
Router.post("/get-inventory-hospital",authMiddleware,getInventoryHospitalController);
//Get Donation Inventory
Router.post("/get-inventory-donation",authMiddleware,getInventoryDonorController);
module.exports=Router