import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Moon, Sun } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = ({ theme, setTheme }) => {
  const location = useLocation()
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Groups', path: '/group' },
    { name: 'Contact Us', path: '/contact' },
  ]

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile-dropdown')) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <nav className="bg-indigo-700 dark:bg-gradient-to-br dark:from-[#0f1115] dark:via-[#1a1d22] dark:to-[#0f1115] text-white dark:text-[#00fff7] shadow-md fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center border-b border-cyan-400/20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/finance.png" alt="Logo" className="w-7 h-7 object-cover rounded-sm" />
          <span className="text-xl font-bold tracking-wide text-white dark:text-[#5EF1F2]">EquiPay</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-indigo-200 dark:hover:text-[#5EF1F2] transition ${
                location.pathname === link.path ? 'underline underline-offset-4' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Theme + Profile/Login */}
        <div className="hidden md:flex items-center gap-4 relative profile-dropdown">
          {/* Toggle Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-indigo-600 dark:hover:bg-[#00fff7]/10 transition"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Profile / Login */}
          {isAuthenticated && !isLoading ? (
            <>
              <button onClick={() => setShowDropdown(!showDropdown)} className="focus:outline-none">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-[#00fff7] hover:border-indigo-300"
                />
              </button>
              {showDropdown && (
                <div className="absolute top-12 right-0 mt-2 w-48 bg-white dark:bg-[#121212] text-black dark:text-[#00fff7] rounded-xl shadow-xl z-50 border border-gray-200 dark:border-[#00fff7]/30 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-[#00FFF7]/20 text-sm">
                    <p className="text-xs text-gray-500 dark:text-[#00fff7]/70">Signed in as</p>
                    <p className="font-semibold truncate">{user.name}</p>
                  </div>
                  <button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#00fff7]/10 text-sm transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-white dark:bg-[#00fff7] dark:text-black text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-[#00e0ff] transition text-sm font-medium"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-600 dark:bg-black px-4 pb-4">
          <div className="flex flex-col space-y-3 mt-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-white dark:text-[#00FFF7] hover:text-indigo-300 dark:hover:text-[#5EF1F2] ${
                  location.pathname === link.path ? 'underline underline-offset-4' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth + Theme */}
            <div className="border-t border-indigo-400 dark:border-[#00fff7]/30 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm dark:text-[#00fff7]">Dark Mode</span>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-[#00fff7]/10 transition">
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>

              {isAuthenticated && !isLoading ? (
                <>
                  <div className="flex items-center gap-2 text-sm mt-3 mb-2 text-white dark:text-[#00fff7]">
                    <img src={user.picture} alt="User" className="w-6 h-6 rounded-full" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout({ logoutParams: { returnTo: window.location.origin } })
                      setMobileMenuOpen(false)
                    }}
                    className="w-full bg-white dark:bg-[#00fff7] dark:text-black text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-[#00e0ff] text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    loginWithRedirect()
                    setMobileMenuOpen(false)
                  }}
                  className="bg-white text-indigo-700 dark:bg-[#00fff7] dark:text-black px-4 py-2 rounded hover:bg-indigo-100 dark:hover:bg-[#00e0ff] text-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
