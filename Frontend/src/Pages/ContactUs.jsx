import React, { useState } from 'react'
import emailjs from 'emailjs-com'

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Replace with your EmailJS credentials
    emailjs.send('service_o63nwo8', 'template_pda537x', form, 'SKyCZVXAZ-z6DxFj8')
      .then(() => {
        setSubmitted(true)
        setForm({ name: '', email: '', message: '' })
      })
      .catch((err) => {
        console.error('EmailJS Error:', err)
        alert('❌ Failed to send message.')
      })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-100 px-6 py-20">
  <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e293b] shadow-2xl rounded-2xl p-8">
    <h1 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300 text-center">
      Contact Us
    </h1>

    {submitted ? (
      <p className="text-green-600 dark:text-green-400 text-center font-medium">
        ✅ Thanks for contacting us! We’ll respond shortly.
      </p>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#334155] text-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#334155] text-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-[#334155] text-black dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2 rounded-full font-medium transition"
          >
            📬 Send Message
          </button>
        </div>
      </form>
    )}
  </div>
</div>

  )
}

export default ContactUs
