const mongoose  = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

//get blood Details
const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.user?._id);
    await Promise.all(bloodGroups.map(async (bloodGroup) => {
      //total in
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            bloodgroup: bloodGroup,
            inventoryType: "in",
            organisation,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      //total out
      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            bloodgroup: bloodGroup,
            inventoryType: "out",
            organisation,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);
      //calculate Total
      const availableBlood =
        (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
      //Push Data
      bloodGroupData.push({
        bloodGroup,
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        availableBlood,
      });
    })) ;
    return res.status(200).send({
        success:true,
        message:"Blood Group Data fetch sucessfully",
        bloodGroupData
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in bloodgroup API",
      error,
    });
  }
};
module.exports = { bloodGroupDetailsController };
