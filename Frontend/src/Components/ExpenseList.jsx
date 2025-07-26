import React from 'react'
import { Trash2 } from 'lucide-react'

const ExpenseList = ({ expenses, members, groupId, onDelete,setDeletingExpense }) => {

  const handleDelete = async (expenseId) => {
    setDeletingExpense(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${groupId}/expenses/${expenseId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        onDelete()  
      } else {
        console.error('Failed to delete expense')
      }
    } catch (error) {
      console.error('Error deleting expense:', error)
    }finally{
      setDeletingExpense(false)
    }
  }
//modify
  return (
    <ul className="space-y-4 text-gray-800 dark:text-gray-200">
      {expenses.map((expense) => (
        <li
          key={expense._id}
          className="border-b border-gray-200 dark:border-gray-700 pb-3"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold text-lg text-indigo-800 dark:text-indigo-300">
                {expense.description} — ₹{expense.amount}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Paid by <strong>{members.find(m => m.email === expense.paidBy)?.name || expense.paidBy}</strong>, shared by{' '}
                <span className="font-medium text-indigo-700 dark:text-indigo-400">
                  {expense.sharedBy.map((email) => {
                    const member = members.find((m) => m.email === email)
                    return member ? member.name : email
                  }).join(', ')}
                </span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(expense._id)}
              title="Delete"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList
