import React from 'react'
import DeleteButton from './DeleteButton'

const MemberList = ({ members, groupId, onDelete }) => (
  <ul className="space-y-3 pl-2 text-gray-800 dark:text-gray-200">
    {members.map(member => (
      <li
        key={member.email}
        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <span className="font-medium">{member.name}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">({member.email})</span>
        </div>
        <DeleteButton
          type="member"
          groupId={groupId}
          identifier={member.email}
          onDelete={onDelete}
        />
      </li>
    ))}
  </ul>
)

export default MemberList
