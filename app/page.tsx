"use client"

import { useState } from "react"

export default function Page() {
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!message.trim()) return

    setLoading(true)
    setReply("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      setReply(data.reply || "No response from Rkia.")
    } catch (error) {
      setReply("Something went wrong.")
    }

    setLoading(false)
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Rkia AI</h1>
      <p>Welcome Hamza. You are now building the Rkia app.</p>

      <div style={{ marginTop: 30 }}>
        <input
          type="text"
          placeholder="Talk to Rkia..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: 10, width: 300 }}
        />

        <button
          onClick={sendMessage}
          style={{ padding: 10, marginLeft: 10 }}
        >
          Send
        </button>
      </div>

      <div style={{ marginTop: 30 }}>
        {loading ? <p>Rkia is thinking...</p> : <p>{reply}</p>}
      </div>
    </main>
  )
}
