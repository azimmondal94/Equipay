import Group from "../models/group.js";
import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid'

// get groups of the user
const getUserGroups = async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !user.groups || user.groups.length === 0) {
            return res.json([])
        }
        const groups = await Group.find({ groupId: { $in: user.groups } })
        res.json(groups);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error' })
    }
}

//group creation
const createGroup = async (req, res) => {
    const { groupName, createdBy, creatorName } = req.body;
    if (!groupName || !createdBy || !creatorName) {
        return res.status(400).json({ message: 'Missing required fields' })
    }
    try {
        const groupId = uuidv4()

        const newGroup = new Group({
            groupId,
            groupName,
            members: [{ name: creatorName, email: createdBy }],
        })

        await newGroup.save();
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

const deleteGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
        const deletedGroup = await Group.findOneAndDelete({ groupId: groupId })
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Group not found' })
        }
        await User.updateMany(
            { groups: groupId },
            { $pull: { groups: groupId } }
        )
        res.status(200).json({ message: 'Group deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const getGroupById = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findOne({ groupId });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' })
        }
        res.json(group)
    } catch (error) {
        console.error('Error fetching group:', error)
        res.status(500).json({ message: 'Server error' })
    }

}

const addMember = async (req, res) => {
    const { groupId } = req.params;
    const { name, email } = req.body;
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
        group.members.push({ name, email });
        await group.save()

        await User.findOneAndUpdate(
            { email }, { $addToSet: { groups: groupId }, $set: { name }, }, { upsert: true, new: true }
        )
        res.status(200).json({ message: 'Member added successfully', group })

    } catch (error) {
        console.error('Error adding member:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

const deleteMember = async (req, res) => {
    const { groupId, email } = req.params;

    try {
        const group = await Group.findOne({ groupId })
        if (!group) return res.status(404).json({ message: 'Group not found' })
        //remove the member
        group.members = group.members.filter(member => member.email !== email)
        group.save();
        await User.updateOne({ email }, { $pull: { groups: groupId } })
        res.status(200).json({ message: 'Member removed' })
    } catch (err) {
        console.error('Error removing member:', err)
        res.status(500).json({ message: 'Server error' })
    }

}
const computeSettlements = (expenses, members) => {
  const balances = {}

  // Create email-to-name and name-to-email maps
  const emailToName = {}
  members.forEach(member => {
    emailToName[member.email] = member.name
    balances[member.email] = 0 // Initialize balance using email
  })

  // Calculate net balances using email
  expenses.forEach(expense => {
    const amountPerPerson = expense.amount / expense.sharedBy.length
    balances[expense.paidBy] += expense.amount

    expense.sharedBy.forEach(personEmail => {
      balances[personEmail] -= amountPerPerson
    })
  })

  // Separate creditors and debtors using emails
  const debtors = []
  const creditors = []

  for (const email in balances) {
    const balance = parseFloat(balances[email].toFixed(2))
    if (balance < 0) debtors.push({ email, amount: -balance })
    else if (balance > 0) creditors.push({ email, amount: balance })
  }

  debtors.sort((a, b) => b.amount - a.amount)
  creditors.sort((a, b) => b.amount - a.amount)

  // Settle debts with schema format (taker, giver, balance)
  const settlements = []

  while (debtors.length && creditors.length) {
    const debtor = debtors[0]
    const creditor = creditors[0]

    const minAmount = Math.min(debtor.amount, creditor.amount)

    settlements.push({
      taker: [emailToName[creditor.email], creditor.email],
      giver: [emailToName[debtor.email], debtor.email],
      balance: parseFloat(minAmount.toFixed(2))
    })

    debtor.amount -= minAmount
    creditor.amount -= minAmount

    if (debtor.amount < 0.01) debtors.shift()
    if (creditor.amount < 0.01) creditors.shift()
  }

  return settlements
}


const calculateSettlement = async (group) => {
    const settlements = computeSettlements(group.expenses, group.members)
    group.settlements = settlements
    return group
}
const addExpense = async (req, res) => {
    const { groupId } = req.params;
    const { description, amount, paidBy, sharedBy } = req.body;
    if (!description || !amount || !paidBy || !Array.isArray(sharedBy)) {
        return res.status(400).json({ message: 'Missing or invalid fields' })
    }
    try {
        let group = await Group.findOne({ groupId });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' })
        }
        group.expenses.push({
            description,
            amount,
            paidBy,
            sharedBy,
        })
        group=await calculateSettlement(group)
        await group.save();
        res.status(201).json({ message: 'Expense added successfully', group })


    } catch (error) {
        console.error('Error adding expense:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

const deleteExpense=async (req,res)=>{
    const { groupId,expenseId } = req.params;
    try {
    let group = await Group.findOne({ groupId })
    if (!group) return res.status(404).json({ message: 'Group not found' })

    group.expenses = group.expenses.filter(exp => exp._id.toString() !== expenseId)

    group=await calculateSettlement(group);
    await group.save()

    res.status(200).json({ message: 'Expense deleted' })
  } catch (err) {
    console.error('Error deleting expense:', err)
    res.status(500).json({ message: 'Server error' })
  }
}





export { getUserGroups, createGroup, deleteGroup, getGroupById, addMember, deleteMember,addExpense,deleteExpense,calculateSettlement }

//start modification