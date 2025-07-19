import React from 'react'
import DeleteButton from './DeleteButton'

const ExpenseList = ({ expenses, members, groupId, onDelete }) => (
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
              Paid by <strong>{members.find(m => m.email === expense.paidBy)?.name || expense.paidBy}</strong>
              , shared by{' '}
              <span className="font-medium text-indigo-700 dark:text-indigo-400">
                {expense.sharedBy.map((email) => {
                  const member = members.find((m) => m.email === email)
                  return member ? member.name : email
                }).join(', ')}
              </span>
            </p>
          </div>
          <DeleteButton
            type="expense"
            groupId={groupId}
            identifier={expense._id}
            onDelete={onDelete}
          />
        </div>
      </li>
    ))}
  </ul>
)

export default ExpenseList
