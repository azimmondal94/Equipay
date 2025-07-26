import React from 'react'

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="min-h-screen dark:bg-[#0f1115] flex items-center justify-center text-indigo-700 dark:text-[#00fff7] font-semibold text-lg">
    <div className="flex items-center gap-3">
      <svg
        className="animate-spin h-6 w-6 text-indigo-700 dark:text-[#00fff7]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span>{text} ...</span>
    </div>
  </div>
  )
}

export default Loading
