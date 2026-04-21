const mongoose=require('mongoose');
const invenorySchema=new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true,"Inventory type require"],
        enum:["in","out"],
    },
    bloodgroup:{
        type:String,
        required:[true,"blood group is required"],
        enum:["O+","O-","AB+","AB-","B+","B-","A+","A-"],
    },
    quantity:{
        type:Number,
        required:[true,"Blood quantity is required"],
    },
    email:{
        type:String,
        required:[true,"Donar email is required"]
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"organisation is required"]
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:function(){
            return this.inventoryType=='out'
        },
    },
    donar:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:function(){
            return this.inventoryType=='in'
        }
    }
},{timestamps:true})
module.exports=mongoose.model('Inventory',invenorySchema);