import React, { useState, useRef } from 'react'

const VoiceInput = ({ setText, setRawText }) => {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  const handleStart = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('🎙️ Your browser does not support speech recognition.')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = 'en-US'
    recognitionRef.current.interimResults = false
    recognitionRef.current.maxAlternatives = 1

    recognitionRef.current.onstart = () => setListening(true)
    recognitionRef.current.onend = () => setListening(false)

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || ''
      if (transcript) {
        setRawText?.(transcript)
        setText?.(transcript)
      }
    }

    recognitionRef.current.start()
  }

  return (
    <button
      onClick={handleStart}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition duration-200
        ${listening
          ? 'bg-red-100 text-red-600 dark:bg-red-800/20 dark:text-red-400 border border-red-400'
          : 'bg-blue-100 text-blue-600 dark:bg-blue-800/20 dark:text-blue-400 border border-blue-400'
        }
        hover:shadow-sm hover:scale-105`}
    >
      🎤 {listening ? 'Listening...' : 'Use Voice'}
    </button>
  )
}

export default VoiceInput
