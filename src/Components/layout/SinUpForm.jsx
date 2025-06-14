import React from 'react'
import { Link } from 'react-router-dom'
import AnimateSignUp from "../comman/AnimateSignUp.jsx"
import Input from "../comman/InputVerse.jsx"
import GoogleButton from "../UIverse/GoogleButto.jsx"
import InteractiveHoverButtonDemo from "../comman/InteractiveHover.jsx";


const SignUpForm = () => {
  const ContinueGoogle = () => {
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
        <form className="space-y-6 ">
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
              <div className='mt-6  md:mx-5 mx-0' >
          <InteractiveHoverButtonDemo Name={'Sign Up'} />
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
