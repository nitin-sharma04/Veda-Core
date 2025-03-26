import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"

// Define the request body type
interface RequestBody {
  messages: { role: "user" | "assistant" | "system"; content: string }[]
}

export async function POST(request: Request) {
  try {
    // Get API keys from environment variables
    const openaiApiKey = process.env.OPENAI_API_KEY
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    const aiProvider = process.env.AI_PROVIDER || "openai" // Default to OpenAI if not specified

    // Parse the request body
    const body: RequestBody = await request.json()
    const { messages } = body

    if (!messages || !messages.length) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 })
    }

    // Check if we have the required API key
    if ((aiProvider === "openai" && !openaiApiKey) || (aiProvider === "anthropic" && !anthropicApiKey)) {
      return NextResponse.json({ error: `${aiProvider.toUpperCase()} API key is not configured` }, { status: 500 })
    }

    // Generate response based on the selected AI provider
    let response

    if (aiProvider === "anthropic" && anthropicApiKey) {
      response = await generateText({
        model: anthropic("claude-3-haiku-20240307"),
        messages: messages,
      })
    } else {
      // Default to OpenAI
      response = await generateText({
        model: openai("gpt-4o"),
        messages: messages,
      })
    }

    return NextResponse.json({ response: response.text })
  } catch (error) {
    console.error("Error in Dhara AI API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

