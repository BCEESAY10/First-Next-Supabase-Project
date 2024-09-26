"use client";
import React, { useEffect, useState, useRef} from "react";
import { Send } from 'lucide-react';

let mounted = false

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSendMessage() {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: "You", text: input },
      ]);
      setInput(""); 
      setLoading(true); // Set loading state for feedback

      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          body: JSON.stringify({ prompt: input }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer GEMINI_API_KEY",   
          },
        })


        const data = await response.json();

        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "Jula-Bot", text: data.message }, 
        ]);
        return  
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "Jula-Bot", text: "Oops! Something went wrong." },
        ]);
      } finally {
        setLoading(false); // Turn off the loading state
      }
    }
  }

  useEffect(() => {
    const chats = localStorage.getItem("chats")
    if(chats){
        setMessages(JSON.parse(chats))
    }
  }, [])

  useEffect(() => {

    if(mounted)
     localStorage.setItem("chats", JSON.stringify(messages))

     return ()=>{
        mounted=true
     }
  }, [messages])

  return (
    <div className="max-w-[400px] w-full space-y-4 mx-auto mt-6 h-[calc(100svh-90px)] flex flex-col bg-gray-100 rounded-lg">
      <div className="flex-1 flex flex-col">
        <div className="bg-slate-800 text-white p-4 text-center font-bold">
          Chatbot
        </div>

        <div className=" block px-4 h-[550px] overflow-clip overflow-y-auto " ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`line-clamp-5  my-2 ${
                msg.user === "You" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  msg.user === "You" ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                <span className="font-semibold">{msg.user}: </span>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 flex items-center">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading} 
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSendMessage}
          disabled={loading} 
        >
          {loading ? "..." : <Send />}
        </button>
      </div>
    </div>
  );
}
