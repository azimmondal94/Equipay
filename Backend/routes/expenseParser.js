import express from 'express'
import { parseExpense } from '../controllers/expenseParser.js'

const router = express.Router()
router.post('/parse-expense', parseExpense)
export default router
