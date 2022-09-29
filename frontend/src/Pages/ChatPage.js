import React, { useState, useEffect } from "react"
import axios from "axios"

export const ChatPage = () => {
  const [chats, setChats] = useState([])

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat")

    setChats(data)
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      {chats.map((e) => (
        <div key={e.id}>{e.chatName}</div>
      ))}
    </div>
  )
}
