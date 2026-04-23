const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");


const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodgroup, quantity } = req.body;

    if (!email || !inventoryType || !bloodgroup || !quantity) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (!req.userId) {
      return res.status(401).send({
        success: false,
        message: "User not authenticated",
      });
    }

    const qty = Number(quantity);
    const organisationId = req.userId;

    // ✅ FIXED ROLE VALIDATION
    if (inventoryType === "in" && user.role !== "donor") {
      return res.status(400).send({
        success: false,
        message: "Only donors can donate blood",
      });
    }

    if (inventoryType === "out" && user.role !== "hospital") {
      return res.status(400).send({
        success: false,
        message: "Only hospitals can request blood",
      });
    }

    // ✅ STOCK CHECK
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

      const available =
        (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      if (available < qty) {
        return res.status(400).send({
          success: false,
          message: `Only ${available}ML available`,
        });
      }
    }

    // ✅ FINAL CORRECT MAPPING
    const inventory = new inventoryModel({
      email,
      inventoryType,
      bloodgroup,
      quantity: qty,
      organisation: organisationId,
      donar: inventoryType === "in" ? user._id : undefined,
      hospital: inventoryType === "out" ? user._id : undefined,
    });

    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "Inventory created successfully",
      inventory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create inventory",
    });
  }
};


// ================= GET INVENTORY =================
const getInventoryController = async (req, res) => {
  try {
    let inventory = [];

    const role = req.user?.role;
    const userId = req.userId;

    // 🔥 ORGANISATION
    if (role === "organisation") {
      const type = req.query.type; // ?type=out

      let filter = {
        organisation: userId,
      };

      // ✅ ONLY OUT (Hospital Tab)
      if (type === "out") {
        filter.inventoryType = "out";
      }

      inventory = await inventoryModel
        .find(filter)
        .populate("donar")
        .populate("hospital")
        .sort({ createdAt: -1 });
    }

    // 🔥 DONOR
    else if (role === "donor") {
      inventory = await inventoryModel
        .find({
          donar: userId,
          inventoryType: "in",
        })
        .populate("organisation")
        .sort({ createdAt: -1 });
    }

    // 🔥 HOSPITAL
    else if (role === "hospital") {
      inventory = await inventoryModel
        .find({
          hospital: userId,
          inventoryType: "out",
        })
        .populate("organisation")
        .sort({ createdAt: -1 });
    }

    // 🔥 DEBUG (very important)
    console.log("ROLE:", role);
    console.log("QUERY TYPE:", req.query.type);
    console.log("RESULT COUNT:", inventory.length);

    return res.status(200).send({
      success: true,
      inventory,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get inventory",
    });
  }
};
// ================= GET DONORS =================
const getDonarsController = async (req, res) => {
  try {
    const organisation = new mongoose.Types.ObjectId(req.userId);

    const records = await inventoryModel
      .find({ organisation, inventoryType: "in" })
      .populate("donar");

    const donars = records.filter(item => item.donar);

    res.status(200).send({
      success: true,
      donars,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in donor records",
    });
  }
};


// ================= GET HOSPITAL =================
const getHospitalController = async (req, res) => {
  try {
    const hospitals = await userModel.find({ role: "hospital" });

    res.status(200).send({
      success: true,
      hospitals,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching hospitals",
    });
  }
};


// ================= GET ORGANISATION (DONOR SIDE) =================
const getOrganisationController = async (req, res) => {
  try {
    const donor = req.userId;

    const orgId = await inventoryModel.distinct("organisation", {
      donar: donor,
    });

    const organisations = await userModel
      .find({ _id: { $in: orgId } })
      .select("-password");
    console.log(organisations);
    res.status(200).send({
      success: true,
      organisations,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};


// ================= GET ORGANISATION (HOSPITAL SIDE) =================
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.userId;

    const orgId = await inventoryModel.distinct("organisation", {
      hospital,
      inventoryType: "out",
    });

    const organisations = await userModel.find({
      _id: { $in: orgId },
    });

    res.status(200).send({
      success: true,
      organisations,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};


// ================= HOSPITAL INVENTORY =================
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ hospital: req.userId, inventoryType: "out" })
      .populate("organisation")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      inventory,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};


// ================= DONOR INVENTORY =================
const getInventoryDonorController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ donar: req.userId, inventoryType: "in" })
      .populate("organisation")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      inventory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error",
    });
  }
};


// ================= EXPORT =================
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