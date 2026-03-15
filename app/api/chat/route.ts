import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message || ""

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.4",
      input: `You are Rkia, a wise helpful assistant. Reply clearly and warmly.\n\nUser: ${message}`,
    })

    const text = response.output_text || "I am here, Hamza."

    return Response.json({ reply: text })
  } catch (error) {
    console.error(error)
    return Response.json(
      { reply: "Something went wrong while talking to Rkia." },
      { status: 500 }
    )
  }
}
