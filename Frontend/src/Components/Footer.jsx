import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className=" px-6 py-8 bg-[#325a67] dark:bg-gradient-to-br dark:from-[#0f1115] dark:via-[#1a1d22] dark:to-[#0f1115] text-white dark:text-[#00fff7] shadow-md ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-[#a4ef0f] tracking-wide">EquiPay</span>
          <span className="text-sm text-[#c3c61b] hidden sm:inline">© {new Date().getFullYear()} All rights reserved</span>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-[#5ef1f2] transition">About</a>
          <Link to="/contact" className="hover:text-[#5ef1f2] transition">Contact</Link>
          <a href="#" className="hover:text-[#5ef1f2] transition">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a target="_blank"
  rel="noopener noreferrer"
   href="https://github.com/azimmondal94" className="hover:text-[#5ef1f2] transition"><i className="fab fa-github"></i></a>
          <a target="_blank"
  rel="noopener noreferrer"
   href="https://www.linkedin.com/in/azim-mondal-98580831b/" className="hover:text-[#5ef1f2] transition"><i className="fab fa-linkedin"></i></a>
          <a target="_blank"
  rel="noopener noreferrer"
   href="https://www.instagram.com/azimmondal94/" className="hover:text-[#5ef1f2] transition"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
