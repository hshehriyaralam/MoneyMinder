import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedAvatar from "../Components/comman/AnimateAvtar.jsx"
import Input from "../Components/comman/InputVerse.jsx"
import SignUpButton from "../Components/UIverse/SignUpButton.jsx";
import GoogleButton from "../Components/UIverse/GoogleButto.jsx"
import LoginForm from '@/Components/layout/LoginForm.jsx';


const Login = () => {
  return (
    <div className='md:mb-0 mb-20' >
      <LoginForm />
    </div>
  )
}

export default Login
