const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getDonorListController, getHospitalListController, getOrganisationListController, deleteDonorController, deleteHospitalController, deleteOrganisationController } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { getHospitalController } = require('../controllers/inventoryController');

const Router=express.Router();
//Get DonorList
Router.get('/donor-list',authMiddleware,adminMiddleware,getDonorListController)
//Get HospitalList
Router.get('/hospital-list',authMiddleware,adminMiddleware,getHospitalListController)
//Get OrgansiationList
Router.get('/organisation-list',authMiddleware,adminMiddleware,getOrganisationListController)

//Delete Donor
Router.delete(
    "/delete-donor/:id",
    authMiddleware,
    adminMiddleware,
    deleteDonorController
);
Router.delete(
    "/delete-hospital/:id",
    authMiddleware,
    adminMiddleware,
    deleteHospitalController
);
//Delete Organisation
Router.delete(
    "/delete-organisation/:id",
    authMiddleware,
    adminMiddleware,
    deleteOrganisationController
);
module.exports=Router;