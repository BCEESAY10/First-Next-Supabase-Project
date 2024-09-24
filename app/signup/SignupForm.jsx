"use client"


import Link from 'next/link';
import React, { useRef, useState } from 'react';


export default function SignUpForm (props){
  const [state, setState ] = useState({})
  const formElement = useRef()

  async function handleSubmit(event){
    event.preventDefault()

    // HTML form element
    const form = formElement.current
    
    try {
      if (form.checkValidity()) {
        await props.submitForm(state)
        alert("You have registered successfully.")
        form.reset()
        setState({})
      } else {
        alert("Invalid form-data")
        form.reportValidity()
      }
        
    } catch (error) {
      alert(error.message)

    }
  }

  function handleInputChange(event)
  {
    setState((prev)=>({
      ...prev,
      [event.target.name]:event.target.value
    }))
  }



  return (
    <form ref={formElement} onSubmit={handleSubmit} className='max-w-[400px] w-full space-y-4 mx-auto mt-6 block'> 
    <h3 className='font-semibold text-xl text-center border-b mb-4 p-2'>Register Now</h3>

    <div className="grid gap-1 w-full">
      <label>First name</label>
      <input
      required
      minLength={3}
      maxLength={15}
        type="text"
        className="p-2 rounded-xl"
        placeholder="First name"
        name="firstName"
        defaultValue={state.firstName}
        onChange={handleInputChange}
      />
    </div>

    <div className="grid gap-1 w-full">
      <label>Last name</label>
      <input
      required
      minLength={3}
      maxLength={15}
        type="text"
        className="p-2 rounded-xl"
        placeholder="Last name"
        name="lastName"
        defaultValue={state.lastName}
        onChange={handleInputChange}
      />
    </div>

    <div className="grid gap-1 w-full">
      <label>Email address</label>
      <input
        type="email"
        className="p-2 rounded-xl"
        placeholder="Enter email"
        name="email"
        defaultValue={state.email}
        onChange={handleInputChange}
      />
    </div>

    <div className="grid gap-1 w-full">
      <label>Password</label>
      <input
        type="password"
        className="p-2 rounded-xl"
        placeholder="Enter password"
        name="password"
        defaultValue={state.password}
        onChange={handleInputChange}
      />
    </div>

    <div className="flex justify-center items-center">
      <button type="submit" className="p-2 px-4 rounded-full mx-auto bg-white text-black">
        Sign Up
      </button>
    </div>
    <p className="forgot-password text-center text-black w-full">

      Already registered? <Link href="/login" className='hover:underline underline-offset-4 transition text-red-600'>Sign In</Link>
    </p>
  </form>
  )
}