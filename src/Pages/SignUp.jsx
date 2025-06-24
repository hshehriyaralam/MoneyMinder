import React, { useEffect } from 'react'
import SignUpForm from '../Components/layout/SinUpForm';


const SignUp = () => {

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  },[])
  
  return (
    <div>
      <SignUpForm />
    </div>
  )
};


export default SignUp
