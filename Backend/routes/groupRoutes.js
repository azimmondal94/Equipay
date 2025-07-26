import express from 'express';
import { addExpense, addMember, calculateSettlement, createGroup, deleteExpense, deleteGroup, deleteMember, getGroupById, getUserGroups } from '../controllers/groupControllers.js'

const router=express.Router();

router.get('/groups',getUserGroups)
router.get('/groups/:groupId',getGroupById)

router.post('/groups',createGroup)
router.post('/groups/:groupId/add-member',addMember)
router.post('/groups/:groupId/add-expense',addExpense)
router.post('/groups/:groupId/calculate',calculateSettlement)

router.delete('/groups/:groupId',deleteGroup)
router.delete('/groups/:groupId/member/:email',deleteMember)
router.delete('/groups/:groupId/expenses/:expenseId',deleteExpense)

export default router;

