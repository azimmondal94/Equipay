
import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  paidBy: String,
  sharedBy: [String],
  date: { type: Date, default: Date.now },
})

const MemberSchema = new mongoose.Schema({
  name: String,
  email: String,
})

const GroupSchema = new mongoose.Schema({
  groupId: String,
  groupName: String,
  members: [MemberSchema],
  expenses: [ExpenseSchema],
})

export default mongoose.model('Group', GroupSchema)

