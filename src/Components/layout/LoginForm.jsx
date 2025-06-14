import React from 'react'
import { Link } from 'react-router-dom'
import AnimateLogin from "../comman/Ainimate-LOgin.jsx"
import Input from "../comman/InputVerse.jsx";
import GoogleButton from "../UIverse/GoogleButto.jsx"
import ButtonComponent from "../comman/VerseButton.jsx";



const LoginForm = () => {
  const ContinueGoogle = () => {
    alert("Login")
  }
  return (
    <div className="h-screen bg-transparent flex  justify-center items-center  ">
  <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg  rounded-lg shadow-2xl overflow-hidden flex flex-col p-2">

    <div className="flex flex-col md:flex-row  p-4  ">
      <div className="md:w-1/2  flex items-center justify-center p-6 ">
            <AnimateLogin />
      </div>
      <div className="md:w-1/2  py-4 p-6 px-6 md:px-4  mx-auto     mt-0  ">
      <h2 className="text-[#1f2937] text-[30px] mx-15 font-bold mt-5">Login</h2>
          {/* Email */}
        <form className="space-y-5 ">
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
              <div className='mx-5 mt-6'>
        <ButtonComponent Name={'Login'} />

              </div>
             <p className="text-[12px] text-[#1f2937] mx-4 mt-3  ">
            Don't have a  account?{" "}

            <Link to="/SignUp" className="text-[#FF9900] hover:underline text-[14px] font-bold">Sign Up</Link>
          </p>
            </div>
          {/* Continue with Google */}
          <div className='mx-1  mt-0'>
          <GoogleButton onClick={ContinueGoogle} />
          </div>
          
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default LoginForm
