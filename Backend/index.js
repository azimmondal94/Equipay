import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './connection.js'
import groupRoutes from './routes/groupRoutes.js'
import expenseParser from './routes/expenseParser.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api', groupRoutes)
app.use('/api/AI',expenseParser)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
