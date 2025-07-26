import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Calculate = () => {
  const { groupId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { group } = location.state || {}

  if (!group) {
    return (
      <div className="p-10 text-center dark:bg-[#0f1115] text-indigo-700 dark:text-[#00fff7] font-semibold">
        Invalid group data
      </div>
    )
  }

  const settlements = group.settlements || []

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-[#0f1115] px-6 py-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-[#00fff7] mb-6">
          Settlement Summary
        </h1>

        {settlements.length === 0 ? (
          <p className="text-gray-600 dark:text-green-400">
            Everyone is settled up! 🎉
          </p>
        ) : (
          <ul className="space-y-4">
            {settlements.map((s, idx) => (
              <li
                key={idx}
                className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-green-300 p-4 rounded-lg shadow transition"
              >
                <strong>{s.giver[0]}</strong> should give <strong>{s.taker[0]}</strong> ₹{s.balance}
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
