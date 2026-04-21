const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    // Validate required fields
    const { email, inventoryType, bloodgroup, quantity } = req.body;

    if (!email || !inventoryType || !bloodgroup || !quantity) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Get organisation ID from logged-in user
    const organisationId = req.userId
      ? new mongoose.Types.ObjectId(req.userId)
      : null;

    if (!organisationId) {
      return res.status(401).send({
        success: false,
        message: "User not authenticated",
      });
    }

    // Convert quantity
    const requestQuantityOfBlood = Number(quantity);

    // Role validation
    // Only donor can donate blood
    if (inventoryType === "in" && user.role !== "donor") {
      return res.status(400).send({
        success: false,
        message: "Only donors can donate blood",
      });
    }

    // Only hospital can request blood
    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(400).send({
        success: false,
        message: "Only hospitals can request blood",
      });
    }

    // Check blood availability for OUT request
    if (inventoryType === "out") {
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            organisation: organisationId,
            inventoryType: "in",
            bloodgroup,
          },
        },
        {
          $group: {
            _id: "$bloodgroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            organisation: organisationId,
            inventoryType: "out",
            bloodgroup,
          },
        },
        {
          $group: {
            _id: "$bloodgroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      // Calculate available blood
      const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      // Reject if insufficient blood
      if (available < requestQuantityOfBlood) {
        return res.status(400).send({
          success: false,
          message: `Only ${available}ML of ${bloodgroup} is available`,
        });
      }
    }

    // Create inventory record
    const inventory = new inventoryModel({
      email,
      inventoryType,
      bloodgroup,
      quantity: requestQuantityOfBlood,
      organisation: organisationId,

      // Assign hospital for OUT
      hospital: inventoryType === "out" ? req.userId  : undefined,

      // Assign donor for IN
      donar: inventoryType === "in" ? req.userId : undefined,
    });

    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New Blood record is added",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in inventory API",
      error: error.message,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    let inventory;

    if (req.userRole === "hospital") {
      inventory = await inventoryModel.find({
        hospital: req.userId,
        inventoryType: "out",
      });
    }

    if (req.userRole === "donor") {
      inventory = await inventoryModel.find({
        donar: req.userId,
        inventoryType: "in",
      });
    }

    if (req.userRole === "organisation") {
      inventory = await inventoryModel.find({
        organisation: req.userId,
      });
    }

    return res.status(200).send({
      success: true,
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get inventory",
    });
  }
};
const getDonarsController = async (req, res) => {
  try {
    const organisation = new mongoose.Types.ObjectId(req.userId);

    // Get all donation records (NOT distinct)
    const records = await inventoryModel
      .find({
        organisation,
        inventoryType: "in",
      })
      .populate({
        path: "donar",
        match: { role: "donor" },
      });

    // Remove invalid/null donar
    const donars = records.filter((item) => item.donar);

    return res.status(200).send({
      success: true,
      donars,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in donor records",
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = new mongoose.Types.ObjectId(req.userId);

    // Step 1: Fetch all OUT records
    const records = await inventoryModel
      .find({
        organisation,
        inventoryType: "out",
      })
      .populate("hospital"); // no match here

    // Step 2: Filter only valid hospitals
    const hospitals = records.filter(
      (item) => item.hospital && item.hospital.role === "hospital",
    );

    return res.status(200).send({
      success: true,
      hospitals,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in hospital records",
    });
  }
};
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.userId;

    const orgId = await inventoryModel.distinct("organisation", {
      donar: donar,
    });

    console.log("OrgIds:", orgId);

    const organisations = await userModel.find({
      _id: { $in: orgId },
    })
    .select("-password");
console.log("Organisations:", organisations);
    return res.status(200).send({
      success: true,
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.userId;
    console.log("Hospital:", req.userId);
    const orgId = await inventoryModel.distinct("organisation", {
      hospital:hospital,
      inventoryType: "out",
      // ✅ same as schema
    });

    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    
    return res.status(200).send({
      success: true,
      message:"Hospital Data Fethed Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};
const getInventoryHospitalController=async(req,res)=>{
  try {
    const inventory=await inventoryModel
    .find({hospital: req.userId, 
      inventoryType: "out",
  })
    .populate("donar")
    .populate("hospital")
    .populate("organisation")
    .sort({created:-1});
    return res.status(200).send({
      success:true,
      message:"get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error in Hospital inventory",
      error
    })
  }
};
const getInventoryDonorController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        donar: req.userId,      // ✅ donor filter
        inventoryType: "in",    // ✅ donation
      })
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      inventory,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getInventoryDonorController,
};
