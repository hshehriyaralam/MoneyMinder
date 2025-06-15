import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AnimateSignUp from "../comman/AnimateSignUp.jsx"
import Input from "../comman/InputVerse.jsx"
import GoogleButton from "../UIverse/GoogleButto.jsx"
import InteractiveHoverButtonDemo from "../comman/InteractiveHover.jsx";
import axios from 'axios'
import { Navigate } from 'react-router-dom'


const SignUpForm = () => {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const  Navigate = useNavigate()


  const handleSignUp = async (e) => {
    e.preventDefault()
    try{

      //check email format
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      if(!isEmailValid){
        alert("Please enter a valid email format");
        return;
      }

      await axios.post(`/api/user/signup`, {
        fullName : fullName,
        email  : email,
        password : password
      }, {
        withCredentials : true,
      })
      setFullName('')
      setEmail('')
      setPassword('')
      console.log("SignUp successfully");
      Navigate('/Login')


    }catch(error){
       console.log("SignUp failed",error.message);
      alert("SignUp failed: " + error.message);
      
    }
   
  }
  
  const ContinueGoogle = () =>  {
    alert("Google")
  }
  return (
   <div className="h-screen bg-transparent flex  justify-center items-center  ">
  <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg  rounded-lg shadow-2xl overflow-hidden flex flex-col p-2 ">

    <div className="flex flex-col md:flex-row  p-4  ">
      <div className="md:w-1/2  flex items-center justify-center      ">
            <AnimateSignUp />
      </div>
      <div className="md:w-1/2  p-6 px-4 mx-auto   "  >
      <h2 className="text-[#1f2937] text-[30px] mx-15 font-bold mt-5 ">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSignUp} >
          {/* Name */}
           <div>
              <Input
              type={'string'}
              label={"Full Name"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          {/* Email */}
          <div>
              <Input
              type={'email'}
              label={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          {/* Password */}
         <div>
              <Input
              type={'password'}
              label={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <div className='mt-6  md:mx-5 mx-0' >
          <InteractiveHoverButtonDemo type={'submit'}  Name={'Sign Up'} />
              </div>
             <p className="text-[12px] text-[#1f2937] mx-6 mt-2  ">
            Already have an account?{" "}
            <Link to="/Login" className="text-[#FF9900] hover:underline text-[13px] font-bold">Login</Link>
          </p>
            </div>
          {/* Continue with Google */}
          <div className='mx-3  mt-0'>
          <GoogleButton onClick={ContinueGoogle} />
          </div>
          
        </form>
      </div>
    </div>
  </div>
</div>



  );
};


export default SignUpForm
