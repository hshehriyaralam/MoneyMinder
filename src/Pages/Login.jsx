import React, { useEffect } from 'react'
import LoginForm from '../Components/layout/LoginForm.jsx';



const Login = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  // },[])
  return (
       <div className="min-h-screen h-screen bg-[#f9f9f9] flex justify-center items-center overflow-hidden">
      <LoginForm />
    </div>
  )
}

export default Login
