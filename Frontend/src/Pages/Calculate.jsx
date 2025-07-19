import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

const Calculate = () => {
  const { groupId } = useParams()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState([])
  const navigate = useNavigate()

  const fetchGroup = async () => {
    const API = import.meta.env.VITE_API_BASE_URL
    try {
      const res = await fetch(`${API}/api/groups/${groupId}`)
      const data = await res.json()
      setGroup(data)
      calculateSettlements(data)
    } catch (error) {
      console.error('Error fetching group:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGroup()
  }, [groupId])

  const calculateSettlements = (group) => {
    const balances = {}

    group.members.forEach((m) => {
      balances[m.email] = 0
    })

    group.expenses.forEach((exp) => {
      const share = exp.amount / exp.sharedBy.length
      exp.sharedBy.forEach(email => {
        if (email === exp.paidBy) return
        balances[email] -= share
        balances[exp.paidBy] += share
      })
    })

    const debtors = Object.entries(balances).filter(([_, bal]) => bal < -0.01)
    const creditors = Object.entries(balances).filter(([_, bal]) => bal > 0.01)

    const resultArr = []

    let i = 0, j = 0
    while (i < debtors.length && j < creditors.length) {
      let [debtor, debt] = debtors[i]
      let [creditor, credit] = creditors[j]

      const amount = Math.min(-debt, credit)
      resultArr.push({
        from: group.members.find(m => m.email === debtor)?.name || debtor,
        to: group.members.find(m => m.email === creditor)?.name || creditor,
        amount: amount.toFixed(2),
      })

      debt += amount
      credit -= amount

      if (Math.abs(debt) < 0.01) i++
      else debtors[i][1] = debt

      if (Math.abs(credit) < 0.01) j++
      else creditors[j][1] = credit
    }

    setResult(resultArr)
  }

  if (loading) return (
    <div className="p-10 text-center text-indigo-700 dark:text-[#00fff7] font-semibold">
      Calculating...
    </div>
  )

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-[#0f1115] px-6 py-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-[#00fff7] mb-6">
          Settlement Summary
        </h1>

        {result.length === 0 ? (
          <p className="text-gray-600 dark:text-green-400">
            Everyone is settled up! 🎉
          </p>
        ) : (
          <ul className="space-y-4">
            {result.map((r, idx) => (
              <li
                key={idx}
                className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-green-300 p-4 rounded-lg shadow transition"
              >
                <strong>{r.from}</strong> should give <strong>{r.to}</strong> ₹{r.amount}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
      <button
        onClick={() => navigate(`/group/${groupId}`)}
        className="text-indigo-600 dark:text-[#00ffe0] hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
      >
        ← Back to Group
      </button>
    </div>
      </div>
    </div>
  )
}

export default Calculate
