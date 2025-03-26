"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, User, Bot, Info, Sparkles, Home, ArrowDown } from "lucide-react"
import MandalaBg from "@/components/mandala-bg"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function DharaAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! I am Dhara AI, your Ayurvedic wellness guide. I'm trained on ancient Ayurvedic texts and modern scientific research to provide personalized guidance. How can I assist you today?",
    },
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })

    // Check if messages container is scrollable
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current
      setIsScrollable(scrollHeight > clientHeight)
    }
  }, [messages])

  // Handle scroll to bottom button click
  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessageId = Date.now().toString()
    setMessages((prev) => [...prev, { id: userMessageId, role: "user", content: input }])
    
    // Set typing indicator
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
        content: input,
      })

      // Call the API
      const response = await fetch("/api/dhara-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: conversationHistory,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get AI response")
      }

      const data = await response.json()

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
        },
      ])
    } catch (err) {
      console.error("Error getting AI response:", err)
      
      // Add fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        },
      ])
    } finally {
      setIsTyping(false)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50 flex flex-col">
      <div className="absolute inset-0 z-0 opacity-10">
        <MandalaBg />
      </div>

      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-orange-100 py-4 px-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-orange-600 hover:bg-orange-50">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mr-2 shadow-lg shadow-orange-200/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-serif">Dhara AI</h1>
          </div>

          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-slate-700 rounded-full w-9 h-9">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="text-slate-700 rounded-full w-9 h-9">
              <Info className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto flex flex-col max-w-3xl px-4 py-6 relative z-10">
        <Card className="flex-1 bg-white/90 backdrop-blur-sm border-orange-100 mb-4 overflow-hidden flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>

          <CardContent
            ref={messagesContainerRef}
            className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent"
          >
            <div className="space-y-6">
              {/* AI greeting with enhanced styling */}
              <div className="flex justify-center mb-8">
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200/30">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-slate-900 font-serif">Dhara AI</h2>
                  <p className="text-sm text-slate-600">
                    Your personal Ayurvedic wellness guide, combining ancient wisdom with modern science
                  </p>
                </div>
              </div>

              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex max-w-[85%] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-xl rounded-bl-xl shadow-md shadow-orange-200/30"
                        : "bg-white text-slate-800 rounded-t-xl rounded-br-xl border border-orange-100 shadow-sm"
                    } p-4`}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {message.role === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-sm">{message.content}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex bg-white text-slate-800 rounded-t-xl rounded-br-xl border border-orange-100 shadow-sm p-4 max-w-[85%]">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    </div>
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
          </CardContent>

          {/* Scroll to bottom button */}
          {isScrollable && (
            <Button
              onClick={handleScrollToBottom}
              size="sm"
              className="absolute bottom-20 right-6 bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-orange-100 rounded-full shadow-md p-2 h-8 w-8"
            >
              <ArrowDown className="h-4 w-4" />
              <span className="sr-only">Scroll to bottom</span>
            </Button>
          )}
        </Card>

        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your doshas, diet, sleep, or stress management..."
            className="bg-white/90 backdrop-blur-sm border-orange-100 rounded-full pr-12 pl-5 py-6 shadow-md"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 rounded-full px-3"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Dhara AI combines ancient Ayurvedic wisdom with modern scientific research to provide personalized guidance.
            Not a substitute for professional medical advice.
          </p>
        </div>
      </main>
    </div>
  )
}

