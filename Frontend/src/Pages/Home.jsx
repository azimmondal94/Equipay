import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 dark:from-black dark:via-zinc-900 dark:to-black overflow-hidden flex flex-col items-center justify-center text-center px-6 py-20 transition-colors duration-300">

      {/* Neon Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 
  bg-indigo-300 dark:bg-[#00e0ff] 
  rounded-full filter blur-[120px] 
  opacity-30 animate-pulse transition-colors duration-500">
</div>

<div className="absolute -bottom-32 -right-32 w-96 h-96 
  bg-indigo-500 dark:bg-[#00fff7] 
  rounded-full filter blur-[100px] 
  opacity-40 animate-pulse transition-colors duration-500">
</div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 dark:text-[#00fff7] mb-4 z-10 drop-shadow-md">
        Welcome to <span className="text-indigo-900 dark:text-[#5ef1f2]">EquiPay</span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-700 dark:text-[#c4f5f6] text-lg md:text-xl max-w-2xl mb-8 z-10 leading-relaxed">
        Split expenses smarter with AI 🧠, OCR 📸, and voice input 🎤 <br />
        No math, no mess — just effortless balance.
      </p>

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <Link
          to="/group"
          className="bg-indigo-600 dark:bg-[#00e0ff] text-white dark:text-black px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 dark:hover:bg-[#00cfe5] transition duration-200 shadow-md dark:shadow-[#00fff7]/30"
        >
          🚀 Jump into a Group
        </Link>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-sm text-gray-400 dark:text-[#00ced8] z-10">
        <p>Made for friends, roommates, and travel crews ✈️</p>
        <p>Built with ❤️ by Azim</p>
      </div>
    </div>
  )
}

export default Home
