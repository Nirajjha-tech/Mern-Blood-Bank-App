const userModel = require("../models/userModel");

//Get DonarList
const getDonorListController=async(req,res)=>{
    try {
        const DonorData=await userModel
        .find({role:"donor"})
        .sort({createdAt:-1})
        
        return res.status(200).send({
            success:true,
            Totalcount:DonorData.length,
            message:"Donar list fetched successfully",
            DonorData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in DonorList API",
            error
        })
    }
}
//Get HospitalList
const getHospitalListController=async(req,res)=>{
    try {
        const HospitalData=await userModel
        .find({role:"hospital"})
        .sort({createdAt:-1})
        
        return res.status(200).send({
            success:true,
            Totalcount:HospitalData.length,
            message:"Hospital list fetched successfully",
            HospitalData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in HospitalList API",
            error
        })
    }
}
//Get Organsiation List
const getOrganisationListController=async(req,res)=>{
    try {
        const OrganisationData=await userModel
        .find({role:"organisation"})
        .sort({createdAt:-1})
        
        return res.status(200).send({
            success:true,
            Totalcount:OrganisationData.length,
            message:"Hospital list fetched successfully",
            OrganisationData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in OrganisationList API",
            error
        })
    }
}
//Delete Donar
const deleteDonorController=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Donar record deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while deleting error"
        })
    }

}
const deleteHospitalController=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Hospital record deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while deleting hospital"
        })
    }

}
const deleteOrganisationController=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Organisation record deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while organisation hospital"
        })
    }

}
module.exports={
    getDonorListController,
    getHospitalListController,
    getOrganisationListController,
    deleteDonorController,
    deleteHospitalController,
    deleteOrganisationController

}