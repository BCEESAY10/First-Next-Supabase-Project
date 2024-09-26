import React from 'react'
import Chatbot from "./Chatbot"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function page() {
  const logged_user = cookies().get("sid")?.value
  
  if(!logged_user) redirect("/login?next=/chatbot")
  return (
    <div>
       <Chatbot />
    </div>
  )
}
