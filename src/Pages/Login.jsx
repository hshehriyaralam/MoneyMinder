import React, { useEffect } from 'react'
import LoginForm from '../Components/layout/LoginForm.jsx';



const Login = () => {
  // useEffect(() => {
  //   window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  // },[])
  return (
    <div className='w-full h-screen'>
      <LoginForm />
    </div>
  )
}

export default Login
