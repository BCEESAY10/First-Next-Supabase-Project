import React from 'react'
import LoginForm from "./LoginForm"

import {db} from "../../db"
import {users} from "../../db/users"
import bcrypt from "bcrypt"
import { sql } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function page() {

   async function submitForm(data){
        "use server"

        const results = await db.select().from(users).limit(1).where(
            sql`email=${data.email}`
        )

        const {email, password, ...user} = results[0]
        if (!user) throw new Error("Invalid credentials");

    
        const passwordMatched = bcrypt.compareSync(data.password, password); 
        if (!passwordMatched) throw new Error("Invalid credentials");

        // 
        cookies().set("sid", JSON.stringify(user))
    }

    
    const logged_user = cookies().get("sid")?.value
  
    if(logged_user) redirect("/chatbot")


  return (
      <LoginForm submitForm={submitForm}/>
  )
}
