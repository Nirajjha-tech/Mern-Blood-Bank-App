const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    if (inventoryType == "in" && user.role !== "donar") {
      return res.status(400).send({
        success: false,
        message: "only donar can add blood",
      });
    }
    if (inventoryType == "out" && user.role !== "hospital") {
      return res.status(400).send({
        success: false,
        message: "only hospital can give blood",
      });
    }
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood record is added",
      inventory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in inventory Api",
      error,
    });
  }
};
module.exports = { createInventoryController };
