import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import DeleteButton from '../Components/DeleteButton'
import Loading from '../Components/Loading'

const Groups = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const API = import.meta.env.VITE_API_BASE_URL

  const fetchGroups = async () => {
    try {
      const res = await fetch(`${API}/api/groups?email=${user.email}`)
      const data = await res.json()
      setGroups(data)
    } catch (error) {
      console.error('Error fetching groups:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      fetchGroups()
    }
  }, [isAuthenticated, user])

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return
    setCreating(true)

    try {
      const res = await fetch(`${API}/api/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName: newGroupName,
          createdBy: user.email,
          creatorName: user.name || user.nickname || 'Unnamed User',
        }),
      })

      if (res.ok) {
        setNewGroupName('')
        setShowModal(false)
        await fetchGroups()
      } else {
        console.error('Failed to create group')
      }
    } catch (error) {
      console.error('Error creating group:', error)
    } finally {
      setCreating(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center dark:bg-[#0f1115] justify-center text-indigo-700 dark:text-[#00fff7] font-semibold text-lg">
        Please log in to view your groups.
      </div>
    )
  }

  if (isLoading || loading) return (
  <Loading text="Loading Your Groups" />
  )
  if(deleting) return(
    <Loading text="Deleting the group " />
  )


  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-[#0f1115] px-6 py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-800 dark:text-[#00fff7]">Your Groups</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 dark:bg-[#00fff7] hover:bg-indigo-700 dark:hover:bg-[#00e0ff] text-white dark:text-black px-5 py-2 rounded-full font-semibold shadow transition"
          >
            + Add Group
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-20 text-lg">No groups yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group.groupId}
                className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow hover:shadow-lg transition relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <Link to={`/group/${group.groupId}`}>
                    <h3 className="text-xl font-semibold text-indigo-800 dark:text-[#00fff7] hover:underline">
                      {group.groupName}
                    </h3>
                  </Link>
                  <DeleteButton type="group" groupId={group.groupId} onDelete={fetchGroups} setDeleting={setDeleting} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Members: {group.members?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add Group */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-md shadow-xl transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-[#00fff7]">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full border border-gray-300 dark:border-[#00fff7]/30 bg-white dark:bg-zinc-800 text-black dark:text-white rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#00fff7]"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 text-sm text-black dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={creating}
                className="px-4 py-2 rounded bg-indigo-600 dark:bg-[#00fff7] hover:bg-indigo-700 dark:hover:bg-[#00e0ff] text-white dark:text-black text-sm font-semibold"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Groups
