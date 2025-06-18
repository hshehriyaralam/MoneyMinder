import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AnimateLogin from "../comman/Ainimate-LOgin.jsx"
import Input from "../comman/InputVerse.jsx";
import GoogleButton from "../UIverse/GoogleButto.jsx"
import ButtonComponent from "../comman/VerseButton.jsx";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';





const LoginForm = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()


const handleLogin = async (e) => {
  e.preventDefault()
  try{
    await  axios.post(`/api/user/login`, {
      email : email,
      password : password
    }, 
  {
    withCredentials : true
  })
  console.log("Login Successfully")
  setEmail('')
  setPassword('')
  Navigate('/')


  }catch(error){
      console.log("SignUp failed",error.message);
      alert("Login failed: " , error.message);
    
  }
}

   const ContinueGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try{
        console.log('Google Token Response',tokenResponse)
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers : {
            Authorization : `Bearer ${tokenResponse.access_token}`
          }
        })

        console.log("userInfo",res.data)
        console.log("access_token",tokenResponse.access_token);
        
        const backendRes =  await axios.post(`/api/user/google-auth`, {
          userInfo : res.data
        },{
          withCredentials : true
        })
         console.log("Backend Google Auth Response:",backendRes.data);
         alert("SuccessFuly Login with Google")
      }catch(error){
         console.log('Google Login Failed', error.message);
        alert('Google Login Failed: ' + error.message);
      }
    },
      onError: (error) => {
      console.log('Google Login Error', error);
      alert('Google Login Failed');
    },
  })
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
        <form className="space-y-5  " onSubmit={handleLogin}>
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
              <div className='mx-5 mt-6'>
        <ButtonComponent Name={'Login'} type={'submit'} />

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
