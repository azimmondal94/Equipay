import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import MemberList from '../Components/MemberList'
import ExpenseList from '../Components/ExpenseList'
import AddMemberModal from '../Components/AddMemberModal'
import AddExpenseModal from '../Components/AddExpenseModal'
import Loading from '../Components/Loading'

const GroupView = () => {
  const { groupId } = useParams()
  const { user, isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)

  const [showMemberModal, setShowMemberModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)

  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [addingMember, setAddingMember] = useState(false)
  const [addingExpense, setAddingExpense] = useState(false)
  const [deletingMember, setDeletingMember] = useState(false)
  const [deletingExpense, setDeletingExpense] = useState(false)

  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [sharedBy, setSharedBy] = useState([])

    const API = import.meta.env.VITE_API_BASE_URL

  const fetchGroup = async () => {
    try {
      const res = await fetch(`${API}/api/groups/${groupId}`)
      const data = await res.json()
      setGroup(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (isAuthenticated) fetchGroup()
  }, [groupId, isAuthenticated])

  const handleAddMember = async () => {
  
    if (!memberName || !memberEmail) return
    setAddingMember(true)
    const res = await fetch(`${API}/api/groups/${groupId}/add-member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: memberName, email: memberEmail })
    })

    if (res.ok) {
      handleCloseMemberModal()
      fetchGroup()
    }
    setAddingMember(false)
  }

  const handleAddExpense = async () => {
    if (!desc || !amount || sharedBy.length === 0) {
      console.warn("Missing fields", { desc, amount, sharedBy })
      return
    }
    setAddingExpense(true)
    try {
      const res = await fetch(`${API}/api/groups/${groupId}/add-expense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: desc,
          amount: parseFloat(amount),
          paidBy: user.email,
          sharedBy
        })
      })

      if (res.ok) {
        handleCloseExpenseModal()
        fetchGroup()
      }
    } catch (error) {
      console.error("🔥 Fetch failed:", error)
    }finally{
      setAddingExpense(false)
    }
  }

  const handleCloseMemberModal = () => {
    setShowMemberModal(false)
    setMemberName('')
    setMemberEmail('')
  }

  const handleCloseExpenseModal = () => {
    setShowExpenseModal(false)
    setDesc('')
    setAmount('')
    setSharedBy([])
  }
  const handleCalculateSplit = async () => {
    
      // No change → use cached `group`
      navigate(`/group/${group.groupId}/calculate`, { state: { group } })
    
    //start modify
  }

  if (loading) return (
  <Loading text="Loading Your group" />
 )
 if(addingExpense) return(
  <Loading text='Adding Expense' />
 )
 if(addingMember) return(
  <Loading text='Adding Member' />
 )
 if(deletingExpense) return(
  <Loading text='Deleting Expense' />
 )
 if(deletingMember) return(
  <Loading text='Deleting Member' />
 )


  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-[#0f1115] px-6 py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-indigo-800 dark:text-[#00fff7]">{group.groupName}</h1>

        {/* Members */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">Members</h2>
            <button
              onClick={() => setShowMemberModal(true)}
              className="bg-indigo-600 dark:bg-[#00fff7] text-white dark:text-black px-4 py-1 rounded-full text-sm hover:bg-indigo-700 dark:hover:bg-[#00e0ff] transition"
            >
              + Add Member
            </button>
          </div>
          <MemberList members={group.members} groupId={groupId} onDelete={fetchGroup} setDeletingMember={setDeletingMember} />
        </div>

        {/* Expenses */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-black dark:text-white">Expenses</h2>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="bg-indigo-600 dark:bg-[#00fff7] text-white dark:text-black px-4 py-1 rounded-full text-sm hover:bg-indigo-700 dark:hover:bg-[#00e0ff] transition"
            >
              + Add Expense
            </button>
          </div>
          {group.expenses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No expenses yet.</p>
          ) : (
            <ExpenseList expenses={group.expenses} members={group.members} groupId={groupId} onDelete={fetchGroup} setDeletingExpense={setDeletingExpense}  />
          )}
        </div>
      </div>

      {/* Modals */}
      {showMemberModal && (
        <AddMemberModal
          onClose={handleCloseMemberModal}
          onSubmit={handleAddMember}
          name={memberName}
          setName={setMemberName}
          email={memberEmail}
          setEmail={setMemberEmail}
        />
      )}

      {showExpenseModal && (
        <AddExpenseModal
          onClose={handleCloseExpenseModal}
          onSubmit={handleAddExpense}
          desc={desc}
          setDesc={setDesc}
          amount={amount}
          setAmount={setAmount}
          members={group.members}
          sharedBy={sharedBy}
          setSharedBy={setSharedBy}
        />
      )}

      {/* Calculate Split Button */}
      <div className="mt-10 text-center">
        <button
  onClick={handleCalculateSplit}
  className="bg-green-600 dark:bg-[#00ffa2] text-white dark:text-black px-6 py-3 rounded-full font-semibold hover:bg-green-700 dark:hover:bg-[#00ffcc] transition"
>
  💷 Show Split
</button>
      </div>
    </div>
  )
}

export default GroupView
