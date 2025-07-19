import React, { useState, useEffect } from 'react'
import VoiceInput from './VoiceInput'

const AddExpenseModal = ({
  onClose,
  onSubmit,
  desc,
  setDesc,
  amount,
  setAmount,
  members,
  sharedBy,
  setSharedBy
}) => {
  const [errors, setErrors] = useState({})
  const [rawText, setRawText] = useState('')
  const [parsing, setParsing] = useState(false)

  useEffect(() => {
    setDesc('')
    setAmount('')
    setSharedBy([])
    setErrors({})
    setRawText('')
  }, [])

  const handleSubmit = () => {
    const newErrors = {}
    if (!desc.trim()) newErrors.desc = 'Description is required'
    if (!amount.trim()) newErrors.amount = 'Amount is required'
    if (sharedBy.length === 0) newErrors.sharedBy = 'Select at least one member'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      setErrors({})
      onSubmit()
    }
  }

  const handleParse = () => {
    if (!rawText.trim()) return
    setParsing(true)

    try {
      const lowerText = rawText.toLowerCase().trim()
      const splitIndex = lowerText.indexOf(' for ')

      if (splitIndex !== -1) {
        const amountText = lowerText.slice(0, splitIndex).replace(/[^\d.]/g, '')
        const descText = lowerText.slice(splitIndex + 5).trim()

        if (amountText && !isNaN(amountText)) setAmount(amountText)
        if (descText) setDesc(descText)
      } else {
        alert('Could not parse text. Use format like "1200 for hotel".')
      }
    } catch (e) {
      console.error('❌ Parsing error:', e)
      alert('Error parsing input.')
    } finally {
      setParsing(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 dark:text-green-300 p-6 rounded-lg w-full max-w-md shadow-2xl transition-all">
        <h2 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-[#00ffe0]">Add Expense</h2>

        {/* Raw input (voice/natural) */}
        <label className="block text-sm font-medium text-gray-700 dark:text-green-400 mb-1">📝 Natural Input (optional)</label>
        <textarea
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="E.g. ₹1200 for Hotel"
          className="w-full border px-3 py-2 mb-2 rounded resize-none text-sm dark:bg-zinc-800 dark:text-green-200 dark:border-green-500"
          rows={3}
        />
        <div className="flex items-center justify-between mb-4">
          <VoiceInput setText={setDesc} setRawText={setRawText} />
          <button
            onClick={handleParse}
            disabled={parsing}
            className="text-indigo-600 dark:text-[#00ffe0] text-sm underline ml-4"
          >
            {parsing ? 'Parsing...' : 'Parse & Fill'}
          </button>
        </div>

        {/* Description */}
        <label className="block text-sm font-medium text-gray-700 dark:text-green-400">
          Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Lunch, Hotel"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={`w-full border px-3 py-2 mb-1 rounded dark:bg-zinc-800 dark:text-green-200 ${
            errors.desc ? 'border-red-500' : 'border-gray-300 dark:border-green-500'
          }`}
        />
        {errors.desc && <p className="text-red-500 text-sm mb-2">{errors.desc}</p>}

        {/* Amount */}
        <label className="block text-sm font-medium text-gray-700 dark:text-green-400 mt-3">
          Amount <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="e.g., 1200"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full border px-3 py-2 mb-1 rounded dark:bg-zinc-800 dark:text-green-200 ${
            errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-green-500'
          }`}
        />
        {errors.amount && <p className="text-red-500 text-sm mb-2">{errors.amount}</p>}

        {/* Shared By */}
        <label className="block text-sm font-medium text-gray-700 dark:text-green-400 mt-3">
          Shared By <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2 max-h-40 overflow-y-auto border rounded px-3 py-2 mb-1 dark:bg-zinc-800 dark:border-green-500">
          {members.map((member) => (
            <div key={member.email} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={member.email}
                checked={sharedBy.includes(member.email)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSharedBy((prev) => [...prev, member.email])
                  } else {
                    setSharedBy((prev) => prev.filter((email) => email !== member.email))
                  }
                }}
              />
              <label htmlFor={member.email}>{member.name}</label>
            </div>
          ))}
        </div>
        {errors.sharedBy && <p className="text-red-500 text-sm mb-2">{errors.sharedBy}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:text-green-300 dark:hover:bg-zinc-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-black font-semibold rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddExpenseModal
