import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100 dark:from-black dark:via-zinc-900 dark:to-black overflow-hidden flex flex-col items-center justify-center gap-5 text-center px-6 py-20 transition-colors duration-300">

      {/* Neon Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 
        bg-[#145c9b] dark:bg-[#00e0ff] 
        rounded-full filter blur-[120px] 
        opacity-30 animate-pulse transition-colors duration-500" />
      
      <div className="absolute -bottom-32 -right-32 w-96 h-96 
        bg-[#145c9b] dark:bg-[#00fff7] 
        rounded-full filter blur-[100px] 
        opacity-40 animate-pulse transition-colors duration-500" />

      {/* Animated Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold text-indigo-800 dark:text-[#00fff7] mb-4 z-10 drop-shadow-md"
      >
        Welcome to <span className="text-[#812aec] dark:text-[#f2b75e] permanent-marker-regular">EquiPay </span>
      </motion.h1>

      {/* Animated Typing Subheading */}
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.8, duration: 1 }}
        className="text-gray-900 dark:text-[#81f556] font-bold text-lg md:text-xl max-w-xl mb-8 z-10"
      >
        <Typewriter
          words={[
            'Split expenses with your voice 🎤',
            'No more awkward money talks 💸',
            'Just say it. We’ll handle the rest. 🚀'
          ]}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={30}
          delaySpeed={2000}
        />
      </motion.p>

      {/* CTA Button */}
      <motion.div 
        className="z-10"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <Link
          to="/group"
          className="bg-[#145c9b] dark:bg-[#00e0ff] text-white dark:text-black px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 dark:hover:bg-[#00cfe5] transition duration-200 shadow-md dark:shadow-[#00fff7]/30"
        >
          🚀 Jump into a Group
        </Link>
      </motion.div>

      {/* Footer Note */}
      <motion.div 
        className="mt-16 text-sm text-[#4a185c] dark:text-[#cee390] z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p>Made for friends, roommates & travel crews ✈️</p>
        <p>Built with ❤️ by Azim</p>
      </motion.div>
    </div>
  )
}

export default Home
