import React, { useState } from 'react';
import { db } from '../db';
import { users } from '../db/users';

export default function SignUp() {
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        successMessage: ''
    });

    async function handleSubmit(event) {
        event.preventDefault();
alert("running")
        try {
          await db.insert(users).values(state);
          setState({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              successMessage: 'Sign up successful!'
          });
        } catch (error) {
          alert(error.message)
        }
        
        
    }

    function handleInputChange(event) {
        setState((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
            successMessage: '' 
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={state.firstName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label>Last name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    value={state.lastName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={state.email}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={state.password}
                    onChange={handleInputChange}
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            {state.successMessage && (
                <p className="text-success">{state.successMessage}</p>
            )}
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    );
}
