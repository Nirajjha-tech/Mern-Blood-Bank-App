const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, organisationName, hospitalName, website } = req.body;

    if (!name || !email || !password || !role || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

const existingUser = await userModel.findOne({ email });
if(existingUser){
    return res.status(404).send({
        success:false,
        message:"User already exists"
    })
}


    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      name,
      email,
      password: hashedpassword,
      role,
      phone,
      address,
      organisationName,
      hospitalName,
      website,
    });

    await user.save();

    return res.status(201).send({
      success: true,
      message: "New user is created",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    }); 
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== role) {
      return res.status(400).send({
        success: false,
        message: "Role doesn't match",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login Api",
      error: error.message,
    });
  }
};

const currentController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });

    return res.status(200).send({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentController };