import React from 'react'
import { Trash2 } from 'lucide-react'

const DeleteButton = ({ type, groupId, identifier, onDelete }) => {
    const API = import.meta.env.VITE_API_BASE_URL
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this?')
    if (!confirm) return
    let url=''
    switch (type) {
      case 'group':
        if (!groupId) return console.error('Missing groupId for group deletion')
        url = `${API}/api/groups/${groupId}`
        break

      case 'member':
        if (!groupId || !identifier) return console.error('Missing groupId or email for member deletion')
        url = `${API}/api/groups/${groupId}/member/${identifier}`
        break

      case 'expense':
        if (!groupId || !identifier) return console.error('Missing groupId or expenseId for expense deletion')
        url = `${API}/api/groups/${groupId}/expense/${identifier}`
        break

      default:
        console.error('Invalid delete type provided')
        return
    }

    try {
      const res = await fetch(url, { method: 'DELETE' })
      if (res.ok) {
        if (onDelete) onDelete()
      } else {
        const data = await res.json()
        console.error('Delete failed:', data.message || res.statusText)
      }
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  return (
    <button
      onClick={handleDelete}
      title="Delete"
      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
    >
      <Trash2 size={16} />
    </button>
  )
}

export default DeleteButton
