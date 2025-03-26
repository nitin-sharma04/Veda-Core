import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return the AI provider configuration (but not the API keys)
    return NextResponse.json({
      provider: process.env.AI_PROVIDER || "openai",
      isConfigured: Boolean(
        (process.env.AI_PROVIDER === "anthropic" && process.env.ANTHROPIC_API_KEY) ||
          ((!process.env.AI_PROVIDER || process.env.AI_PROVIDER === "openai") && process.env.OPENAI_API_KEY),
      ),
    })
  } catch (error) {
    console.error("Error fetching AI configuration:", error)
    return NextResponse.json({ error: "Failed to fetch AI configuration" }, { status: 500 })
  }
}

