"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm(props) {
  const [state, setState] = useState({});
  const formElement = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter(); 

  async function handleSubmit(event) {
    event.preventDefault();

    // HTML form element
    const form = formElement.current;

    try {
      if (form.checkValidity()) {
        await props.submitForm(state);

        setShowPopup(true);

        // Hide the popup after 5 seconds and redirect
        setTimeout(() => {
          setShowPopup(false);

          // Redirect the user after the popup is hidden
          const url = new URL(location.href);
          if (url.searchParams.has("next")) {
            const nextPath = url.searchParams.get("next");
            router.push(nextPath); 
          } else {
            router.push("/"); 
          }
        }, 60_000);
        
        form.reset();
        setState({});
      } else {
        alert("Invalid form data");
        form.reportValidity();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function handleInputChange(event) {
    setState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div>
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-md">
          Welcome
        </div>
      )}

      <form
        ref={formElement}
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full space-y-4 mx-auto mt-6 block"
      >
        <h3 className="font-semibold text-xl text-center border-b mb-4 p-2">
          Welcome
        </h3>

        <div className="grid gap-1 w-full">
          <label className="mx-2">Email address</label>
          <input
            type="email"
            className="p-2 rounded-xl mx-2"
            placeholder="Enter email"
            name="email"
            defaultValue={state.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid gap-1 w-full">
          <label className="mx-2">Password</label>
          <input
            type="password"
            className="p-2 rounded-xl mx-2"
            placeholder="Enter password"
            name="password"
            defaultValue={state.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="p-2 px-4 rounded-full mx-auto bg-white text-black"
          >
            Login
          </button>
        </div>

        <p className="forgot-password text-center text-black w-full">
          Not registered?{" "}
          <Link
            href="/signup"
            className="hover:underline underline-offset-4 transition text-red-600 font-bold"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
