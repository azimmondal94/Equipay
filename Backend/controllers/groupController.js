import Group from '../model/Group.js'
import User from '../model/User.js'
import { v4 as uuidv4 } from 'uuid'

// ✅ Create Group
export const createGroup = async (req, res) => {
  const { groupName, createdBy, creatorName } = req.body

  if (!groupName || !createdBy || !creatorName) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const groupId = uuidv4()

    const newGroup = new Group({
      groupName,
      groupId,
      members: [{ name: creatorName, email: createdBy }],
    })

    await newGroup.save()

    await User.findOneAndUpdate(
      { email: createdBy },
      {
        $addToSet: { groups: groupId },
        $set: { name: creatorName },
      },
      { upsert: true, new: true }
    )

    res.status(201).json(newGroup)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ Get Groups of a User
export const getUserGroups = async (req, res) => {
  const { email } = req.query

  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user || !user.groups || user.groups.length === 0) {
      return res.json([])
    }

    const groups = await Group.find({ groupId: { $in: user.groups } })
    res.json(groups)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ Delete Group
export const deleteGroup = async (req, res) => {
  const { groupId } = req.params

  try {
    const deletedGroup = await Group.findOneAndDelete({ groupId })
    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' })
    }

    await User.updateMany(
      { groups: groupId },
      { $pull: { groups: groupId } }
    )

    res.status(200).json({ message: 'Group deleted successfully' })
  } catch (error) {
    console.error('Error deleting group:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ Get Group Details
export const getGroupById = async (req, res) => {
  const { groupId } = req.params

  try {
    const group = await Group.findOne({ groupId })
    if (!group) {
      return res.status(404).json({ message: 'Group not found' })
    }
    res.json(group)
  } catch (error) {
    console.error('Error fetching group:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ Add Member to Group
export const addMemberToGroup = async (req, res) => {
  const { groupId } = req.params
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' })
  }

  try {
    const group = await Group.findOne({ groupId })
    if (!group) return res.status(404).json({ message: 'Group not found' })

    const alreadyInGroup = group.members.some(member => member.email === email)
    if (alreadyInGroup) {
      return res.status(400).json({ message: 'User already in group' })
    }

    group.members.push({ name, email })
    await group.save()

    await User.findOneAndUpdate(
      { email },
      {
        $addToSet: { groups: groupId },
        $set: { name },
      },
      { upsert: true, new: true }
    )

    res.status(200).json({ message: 'Member added successfully', group })
  } catch (error) {
    console.error('Error adding member:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// ✅ Add Expense to Group
export const addExpenseToGroup = async (req, res) => {
  const { groupId } = req.params
  const { description, amount, paidBy, sharedBy } = req.body

  if (!description || !amount || !paidBy || !Array.isArray(sharedBy)) {
    return res.status(400).json({ message: 'Missing or invalid fields' })
  }

  try {
    const group = await Group.findOne({ groupId })
    if (!group) {
      return res.status(404).json({ message: 'Group not found' })
    }

    // Ensure paidBy exists in members
    const isMember = group.members.some(member => member.email === paidBy)
    if (!isMember) {
      return res.status(400).json({ message: 'Payer is not a member of the group' })
    }

    group.expenses.push({
      description,
      amount,
      paidBy,
      sharedBy,
    })

    await group.save()

    res.status(201).json({ message: 'Expense added successfully', group })
  } catch (error) {
    console.error('Error adding expense:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteMemberFromGroup = async (req, res) => {
  const { groupId, email } = req.params

  try {
    const group = await Group.findOne({ groupId })
    if (!group) return res.status(404).json({ message: 'Group not found' })

    // Remove the member
    group.members = group.members.filter(member => member.email !== email)

    // Optional: also remove the member from sharedBy in all expenses
    group.expenses = group.expenses.map(exp => ({
      ...exp.toObject(),
      sharedBy: exp.sharedBy.filter(e => e !== email),
    }))

    // Also delete expenses paid by the removed member
    group.expenses = group.expenses.filter(exp => exp.paidBy !== email)

    await group.save()

    // Remove group from the user's document
    await User.updateOne({ email }, { $pull: { groups: groupId } })

    res.status(200).json({ message: 'Member removed' })
  } catch (err) {
    console.error('Error removing member:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteExpenseFromGroup = async (req, res) => {
  const { groupId, expenseId } = req.params

  try {
    const group = await Group.findOne({ groupId })
    if (!group) return res.status(404).json({ message: 'Group not found' })

    group.expenses = group.expenses.filter(exp => exp._id.toString() !== expenseId)

    await group.save()

    res.status(200).json({ message: 'Expense deleted' })
  } catch (err) {
    console.error('Error deleting expense:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

