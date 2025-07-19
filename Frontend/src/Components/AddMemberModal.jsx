import React from 'react'

const AddMemberModal = ({ onClose, onSubmit, name, email, setName, setEmail }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-zinc-900 dark:text-green-300 p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-[#00ffe0]">Add Member</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 dark:border-green-500 px-3 py-2 mb-3 rounded dark:bg-zinc-800 dark:text-green-200"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 dark:border-green-500 px-3 py-2 mb-3 rounded dark:bg-zinc-800 dark:text-green-200"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-green-300 rounded"
        >
          Cancel
        </button>

        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-green-600 dark:hover:bg-green-700 dark:text-black font-semibold rounded"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)

export default AddMemberModal
