"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  Maximize2,
  Minimize2,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
  isAudio?: boolean
}

// Declare SpeechRecognition variable
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
    speechSynthesis: SpeechSynthesis
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onend: ((this: SpeechRecognition, ev: Event) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
    start: () => void
    stop: () => void
    abort: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    length: number
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative
    length: number
    item(index: number): SpeechRecognitionAlternative
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: SpeechRecognitionErrorCode
  }

  type SpeechRecognitionErrorCode =
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "bad-grammar"
    | "language-not-supported"
}

export default function DharaFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const isMobile = useMobile()

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("dharaMessages")
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (e) {
        console.error("Failed to parse saved messages", e)
      }
    } else {
      // Add welcome message if no history exists
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content:
          "Namaste! I am Dhara AI, your Ayurvedic wellness guide. How can I assist you with your health and wellness journey today?",
        timestamp: Date.now(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("dharaMessages", JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isOpen])

  // Setup speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript
        setInput(transcript)
        // Auto-send the voice message
        handleSendMessage(transcript, true)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.")
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
      setInput("")
    }
  }

  const speakText = (text: string) => {
    if (!audioEnabled) return

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)

      // Get available voices and select a female voice if possible
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find(
        (voice) => voice.name.includes("female") || voice.name.includes("Samantha") || voice.name.includes("Ava"),
      )

      if (femaleVoice) {
        utterance.voice = femaleVoice
      }

      utterance.rate = 1.0
      utterance.pitch = 1.1
      utterance.volume = 1.0

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleAudio = () => {
    if (isSpeaking && audioEnabled) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
    setAudioEnabled(!audioEnabled)
  }

  const handleSendMessage = async (messageText = input, isAudioMessage = false) => {
    const trimmedMessage = messageText.trim()
    if (!trimmedMessage) return

    // Clear any previous errors
    setError(null)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedMessage,
      timestamp: Date.now(),
      isAudio: isAudioMessage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages
        .filter((msg) => msg.id !== "welcome") // Exclude welcome message
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))

      // Add the new user message to history
      conversationHistory.push({
        role: "user",
        content: trimmedMessage,
      })

      // Call the API
      const response = await fetch("/api/dhara-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: conversationHistory,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get AI response")
      }

      const data = await response.json()

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, aiMessage])

      // Speak the response if audio is enabled
      if (audioEnabled) {
        speakText(data.response)
      }
    } catch (err) {
      console.error("Error getting AI response:", err)
      setError(err instanceof Error ? err.message : "Failed to get AI response")

      // Add fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const clearHistory = () => {
    // Keep only the welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! I am Dhara AI, your Ayurvedic wellness guide. How can I assist you with your health and wellness journey today?",
      timestamp: Date.now(),
    }
    setMessages([welcomeMessage])
    localStorage.removeItem("dharaMessages")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(timestamp))
  }

  const formatDate = (timestamp: number) => {
    const today = new Date()
    const messageDate = new Date(timestamp)

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today"
    }

    if (
      messageDate.getDate() === today.getDate() - 1 &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Yesterday"
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: today.getFullYear() !== messageDate.getFullYear() ? "numeric" : undefined,
    }).format(messageDate)
  }

  // Group messages by date
  const groupedMessages = messages.reduce<{ [key: string]: Message[] }>((groups, message) => {
    const date = formatDate(message.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <>
      {/* Floating button */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 shadow-lg",
          isOpen ? "bottom-5 right-5 sm:bottom-8 sm:right-8" : "bottom-5 right-5 sm:bottom-8 sm:right-8",
        )}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative"
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-orange-200/50"
              >
                <Sparkles className="h-6 w-6" />
              </Button>
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-50 bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden",
              isExpanded || isMobile
                ? "inset-4 sm:inset-6 md:inset-8"
                : "bottom-5 right-5 sm:bottom-8 sm:right-8 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)]",
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 flex items-center justify-between text-white">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Dhara AI</h3>
                  <p className="text-xs text-white/80">Your Ayurvedic wellness guide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  onClick={toggleAudio}
                >
                  {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <span className="sr-only">{audioEnabled ? "Mute" : "Unmute"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  <span className="sr-only">{isExpanded ? "Minimize" : "Maximize"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-orange-50/50">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div>{error}</div>
                </div>
              )}

              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date} className="mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {date}
                    </div>
                  </div>

                  {dateMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3 flex flex-col",
                          message.role === "user"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                            : "bg-white border border-orange-100 text-slate-800",
                        )}
                      >
                        {message.isAudio && message.role === "user" && (
                          <div className="flex items-center mb-1 text-white/80 text-xs">
                            <Mic className="h-3 w-3 mr-1" />
                            <span>Voice message</span>
                          </div>
                        )}
                        <div className="text-sm">{message.content}</div>
                        <div
                          className={cn(
                            "text-xs mt-1 self-end",
                            message.role === "user" ? "text-white/80" : "text-slate-500",
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-orange-100 text-slate-800 rounded-2xl px-4 py-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-orange-100 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-500 hover:text-red-500 hover:bg-red-50 text-xs"
                  onClick={clearHistory}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear chat
                </Button>
                {isSpeaking && (
                  <div className="flex-1 flex justify-end">
                    <div className="flex items-center text-orange-500 text-xs animate-pulse">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Speaking...
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening..." : "Ask about Ayurvedic wellness..."}
                  className="pr-24 pl-4 py-6 rounded-full border-orange-200"
                  disabled={isTyping || isListening}
                />
                <div className="absolute right-1 top-1 bottom-1 flex items-center">
                  <Button
                    onClick={toggleListening}
                    disabled={isTyping}
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full mr-1",
                      isListening ? "bg-red-500 text-white" : "border-orange-200",
                    )}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
                  </Button>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 rounded-full h-8 w-8"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-xs text-slate-400">
                  Ask me about doshas, diet, sleep, stress, or any Ayurvedic wellness topic
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

