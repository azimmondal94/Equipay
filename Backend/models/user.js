import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    groups:[{type:String}]// stores groupId
});

const User=mongoose.model('User',userSchema);

export default User;
