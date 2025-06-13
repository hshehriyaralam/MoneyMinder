import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedAvatar from "../Components/comman/AnimateAvtar.jsx"
import Input from "../Components/comman/InputVerse.jsx"
import SignUpButton from "../Components/UIverse/SignUpButton.jsx";
import GoogleButton from "../Components/UIverse/GoogleButto.jsx"


const Login = () => {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6 ">
  <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg  rounded-lg shadow-2xl  overflow-hidden flex flex-col p-2 ">
      <h2 className="text-[#1f2937] text-[30px] text-center font-bold mt-5 ">Login</h2>

    <div className="flex flex-col md:flex-row   ">
      <div className="md:w-1/2  flex items-center justify-center  p-6    ">
            <AnimatedAvatar />
      </div>
      <div className="md:w-1/2  py-4  ">
        <form className="space-y-5">
          {/* Name */}
           <div>
              <Input
              type={'string'}
                label={"Full Name"}/>
            </div>
          {/* Email */}
          <div>
              <Input
              type={'email'}
                label={"Email"} />
            </div>
          {/* Password */}
         <div>
              <Input
              type={'password'}
                label={"Password"}/>
            </div>

            <div>
              <div className='mx-28'>
          <SignUpButton Name={'LOGIN'}  />
              </div>
             <p className="text-[13px] text-[#1f2937] mx-10 mt-1  ">
            Don't have a  account?{" "}

            <Link to="/Login" className="text-[#FF9900] hover:underline text-[14px] font-bold">Sign Up</Link>
          </p>
            </div>
          {/* Continue with Google */}
          <div className='mx-1  mt-0'>
          <GoogleButton />
          </div>
          
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default Login
