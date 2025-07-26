import mongoose from "mongoose";

const memberSchema=new mongoose.Schema({
    email:{type:String},
    name:{type:String}
})

const expenseSchema=new mongoose.Schema({
    amount:{type:Number},
    description:{type:String},
    paidBy:{type:String},
    sharedBy:[{type:String}]
})

const settlementSchema=new mongoose.Schema({
    taker:[{type:String}],// name and email
    giver:[{type:String}],
    balance: Number
})

const groupSchema=new mongoose.Schema({
groupId:{type:String},
groupName:{type:String},
members:[memberSchema],
expenses:[expenseSchema],
settlements:[settlementSchema]
});

const Group=mongoose.model('Group',groupSchema);

export default Group