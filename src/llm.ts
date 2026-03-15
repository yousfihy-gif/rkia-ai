import OpenAI from "openai";
import { z } from "zod";
import { getSystemPrompt } from "./prompts.js";
import type { AdvisorId } from "./types.js";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().default("gpt-5.4")
});

const env = envSchema.parse({
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-5.4"
});

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function askAgent(agent: AdvisorId, userInput: string, extraContext: string) {
  const response = await client.responses.create({
    model: env.OPENAI_MODEL,
    input: [
      { role: "system", content: getSystemPrompt(agent) },
      {
        role: "user",
        content: `Context:\n${extraContext}\n\nUser request:\n${userInput}`
      }
    ]
  });

  return response.output_text;
}
