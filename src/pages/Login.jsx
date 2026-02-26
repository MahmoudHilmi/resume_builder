import React from 'react'
import LoginForm from './../components/auth/loginForm';
import SignupForm from '../components/auth/signupForm';
import { useState } from 'react';
import AuthToggle from '../components/auth/authToggle';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
<div className="w-full flex flex-col items-center justify-center">

      {isLogin ? <LoginForm /> : <SignupForm />}


</div>
  )
}

export default Login