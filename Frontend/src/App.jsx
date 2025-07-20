import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Groups from './Pages/Groups'
import GroupView from './Pages/GroupView'
import Calculate from './Pages/Calculate'
import { useState, useEffect } from 'react'
import ContactUs from './Pages/ContactUs'
import Footer from './Components/Footer'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group" element={<Groups />} />
        <Route path="/group/:groupId" element={<GroupView />} />
        <Route path="/group/:groupId/calculate" element={<Calculate />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
