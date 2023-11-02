const mongoose=require('mongoose');
const Sc=mongoose.Schema({
    u_name:{type:String,required:true},
    u_email:{type:String,required:true,unique:true},
    u_password:{type:String,required:true},
    Image_URL:{type:String,default:null},
    u_phone:{type:Number,default:null} ,
    u_city:{type:String,default:null} ,
    LIC_NO:{type:String,default:null},
    G_user:{type:Boolean,required:true,default:false},
    u_events_joined:[{type:mongoose.Schema.ObjectId,default:null,ref:'event'}]
})    
const Model=mongoose.model('userData',Sc)
module.exports=Model