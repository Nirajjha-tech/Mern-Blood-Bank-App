const express=require("express");
const app=express();
const colors=require("colors");
const morgan=require("morgan");
const cors=require("cors");
const dotenv=require('dotenv');
const connectDB = require("./config/db");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
connectDB();
app.use('/api/v1/auth',require('./routes/authRoute'));
app.use('/api/v1/inventory',require('./routes/inventoryRoute'))
app.use('/api/v1/admin',require("./routes/adminRoute"))
app.use('/api/v1/analytics',require("./routes/analyticsRoute"))
const port=process.env.PORT||8080;
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to Blood Bank App",
    });
});
app.listen(port,()=>{
    console.log(`node server is running on ${port}`.bgBlack.green);
});