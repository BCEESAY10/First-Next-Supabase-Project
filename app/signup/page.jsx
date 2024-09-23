import React from 'react'
import SignUpForm from "./SignupForm"

import {db} from "../../db"
import {users} from "../../db/users"


export default function page() {

   async function submitForm(data){
    "use server"
      await db.insert(users).values(data);
    }


  return (
      <SignUpForm submitForm={submitForm}/>
  )
}
