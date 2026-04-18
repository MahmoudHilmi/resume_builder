import React from 'react'
import LoginForm from './../components/auth/loginForm';
import SignupForm from '../components/auth/signupForm';
import { useState } from 'react';
import AuthToggle from '../components/auth/authToggle';


const Login = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <LoginForm />
    </div>
  )
}

export default Login