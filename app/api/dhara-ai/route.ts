import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"

// Define the request body type
interface RequestBody {
  message: string
  history: { role: "user" | "assistant"; content: string }[]
}

export async function POST(request: Request) {
  try {
    // Get API keys from environment variables
    const openaiApiKey = process.env.OPENAI_API_KEY
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    const aiProvider = process.env.AI_PROVIDER || "openai" // Default to OpenAI if not specified

    // Parse the request body
    const body: RequestBody = await request.json()
    const { message, history } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if we have the required API key
    if ((aiProvider === "openai" && !openaiApiKey) || (aiProvider === "anthropic" && !anthropicApiKey)) {
      return NextResponse.json({ error: `${aiProvider.toUpperCase()} API key is not configured` }, { status: 500 })
    }

    // Prepare the conversation history for the AI
    const formattedHistory = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Create the system prompt for Ayurvedic guidance
    const systemPrompt = `You are Dhara AI, an Ayurvedic wellness guide trained on ancient texts and modern scientific research.
    Provide helpful, accurate information about Ayurvedic principles, doshas (Vata, Pitta, Kapha), diet, lifestyle, herbs, and wellness practices.
    Keep responses concise, practical, and focused on holistic wellness. If you don't know something, acknowledge it and suggest reliable resources.
    Always maintain a warm, supportive tone and use terms like "Namaste" when greeting. Never provide medical diagnoses or claim to treat diseases.`

    // Generate response based on the selected AI provider
    let response

    if (aiProvider === "anthropic" && anthropicApiKey) {
      response = await generateText({
        model: anthropic("claude-3-haiku-20240307"),
        prompt: message,
        system: systemPrompt,
        messages: formattedHistory,
      })
    } else {
      // Default to OpenAI
      response = await generateText({
        model: openai("gpt-4o"),
        prompt: message,
        system: systemPrompt,
        messages: formattedHistory,
      })
    }

    return NextResponse.json({ response: response.text })
  } catch (error) {
    console.error("Error in Dhara AI API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

