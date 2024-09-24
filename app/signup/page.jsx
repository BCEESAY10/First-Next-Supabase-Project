import React from 'react'
import SignUpForm from "./SignupForm"
import { cookies } from "next/headers";
import {db} from "../../db"
import {users} from "../../db/users"

import bcrypt from "bcrypt"
import { redirect } from 'next/navigation'

export default function page() {

   async function submitForm(data){
    "use server"

    const encodingCount = 3
    
    const salt = bcrypt.genSaltSync(encodingCount);
    const hashedPassword = await bcrypt.hashSync(data.password, salt);

    data.password = hashedPassword


    await db.insert(users).values(data);


    }

    const logged_user = cookies().get("sid")?.value
  
    if(logged_user) redirect("/chatbot")


  return (
      <SignUpForm submitForm={submitForm}/>
  )
}
