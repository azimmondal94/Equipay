import express from 'express'
import {
  createGroup,
  getUserGroups,
  deleteGroup,
  getGroupById,
  addMemberToGroup,
  addExpenseToGroup,
  deleteMemberFromGroup,
  deleteExpenseFromGroup
} from '../controllers/groupController.js'

const router = express.Router()

router.post('/groups', createGroup)
router.get('/groups', getUserGroups)
router.get('/groups/:groupId', getGroupById)

router.delete('/groups/:groupId', deleteGroup)
router.delete('/groups/:groupId/member/:email', deleteMemberFromGroup)
router.delete('/groups/:groupId/expense/:expenseId', deleteExpenseFromGroup)

router.post('/groups/:groupId/add-member', addMemberToGroup)
router.post('/groups/:groupId/add-expense', addExpenseToGroup)

export default router

