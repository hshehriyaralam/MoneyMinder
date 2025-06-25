import React, { useContext, useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AnimateSignUp from "../comman/AnimateSignUp.jsx"
import Input from "../comman/InputVerse.jsx"
import GoogleButton from "../UIverse/GoogleButto.jsx"
import InteractiveHoverButtonDemo from "../comman/InteractiveHover.jsx";
import axios from 'axios'
import { useAlert } from "../../Context/AlertContext.jsx";
import { Context } from '../../Context/TransactionContext.jsx';





const SignUpForm = () => {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const  Navigate = useNavigate()
  const { showAlert } = useAlert();
  const {triggerTransactionRefresh} = useContext(Context)
  


  const handleSignUp = async (e) => {
    e.preventDefault()
    try{

      //check email format
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      if(!isEmailValid){
        showAlert("error", "Please Enter Valid email")
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/signup`, {
        fullName : fullName,
        email  : email,
        password : password
      }, {
        withCredentials : true,
      })
      setFullName('')
      setEmail('')
      setPassword('')
      Navigate('/')


    }catch(error){
       if(error.response?.status === 400){
        showAlert("error", "ALL filed is Required");
      }else if(error.response?.status === 409){
        showAlert("error", "User Already Exist");
      }else{
        showAlert("error", "Something Went Wrong");

      }
    }
   
  }
  
const handleGoogleLogin = () => {
  if (email || password) {
    showAlert('error', 'Please clear email and password first');
    return;
  }

  // TokenClient init only now — NOT on page load
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'email profile openid',
    callback: async (tokenResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/google-auth`, {
          userInfo: res.data
        }, {
          withCredentials: true,
        });
        Navigate('/Dashbaord');
        showAlert('success', 'Successfully signup with Google');
        triggerTransactionRefresh()
      } catch (err) {
        console.error('Google login error:', err);
        showAlert('error', 'Google login failed');
      }
    },
  });

  // Now request token
  tokenClient.requestAccessToken();
}


  return (
 <div className="h-min-screen bg-transparent flex justify-center items-center overflow-hidden">
  <div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-lg overflow-hidden flex flex-col">
    <div className="flex flex-col md:flex-row overflow-hidden">
      
      <div className="md:w-1/2 flex items-center justify-center">
        <AnimateSignUp />
      </div>

      <div className="md:w-1/2  md:px-4 mx-auto  overflow-y-auto max-h-screen">
       <h2 className="text-[#1f2937] text-[26px] font-bold text-center md:text-left md:ml-20">
  Sign Up
</h2>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <Input
            type={'string'}
            label={"Full Name"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            type={'email'}
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type={'password'}
            label={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-2 md:mx-4">
            <InteractiveHoverButtonDemo type={'submit'} Name={'Sign Up'} />
          </div>

          <p className="text-[12px] text-[#1f2937]  mx-8">
            Already have an account?{" "}
            <Link to="/" className="text-[#FF9900] hover:underline text-[13px] font-bold">Login</Link>
          </p>

          <div>
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  );
};


export default SignUpForm
