import React, { useContext,  useRef, useState, useEffect } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import AnimateLogin from "../comman/Ainimate-LOgin.jsx"
import Input from "../comman/InputVerse.jsx";
import GoogleButton from "../UIverse/GoogleButto.jsx"
import ButtonComponent from "../comman/VerseButton.jsx";
import axios from 'axios';
import { useAlert } from "../../Context/AlertContext.jsx";
import { Context } from '../../Context/TransactionContext.jsx';





const LoginForm = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const Navigate = useNavigate()
  const { showAlert } = useAlert();
  const {triggerTransactionRefresh} = useContext(Context)
  
const handleLogin = async (e) => {
  e.preventDefault()
  try{
    await  axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/login`, {
      email : email,
      password : password
    }, 
  {
    withCredentials : true
  })
  triggerTransactionRefresh()
  console.log("Login Successfully")
  setEmail('')
  setPassword('')
  Navigate('/Dashbaord')


  }catch(error){
      console.log("Login failed",error.message);
      if(error.response?.status === 401){
        showAlert("error", "Invalid Email Or Password");
      }else if(error.response?.status === 404){
        showAlert("error", "This Email is not Registerd");
      }else{
        showAlert("error", "Server Failed");
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
        triggerTransactionRefresh()
        Navigate('/Dashbaord');
        showAlert('success', 'Successfully Login with Google');
      } catch (err) {
        console.error('Google login error:', err);
        showAlert('error', 'Google login failed');
      }
    },
  });

  // Now request token
  tokenClient.requestAccessToken();
};



  

 
  return (
<div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row p-4 h-[90vh]">
  {/* Left Section - Animate */}
  <div className="md:w-1/2 flex items-center justify-center">
    <div className="w-40 h-40 md:w-64 md:h-64">
      <AnimateLogin />
    </div>
  </div>

  {/* Right Section - Form */}
  <div className="md:w-1/2 flex flex-col justify-center p-6 overflow-hidden">
    <h2 className="text-[#1f2937] text-[26px] font-bold text-center md:text-left mb-4">Login</h2>

    <form className="space-y-4" onSubmit={handleLogin}>
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="mt-2">
        <ButtonComponent Name="Login" type="submit" />
      </div>

      <p className="text-sm text-[#1f2937] mt-2">
        Don't have an account?{" "}
        <Link
          to="/SignUp"
          className="text-[#FF9900] hover:underline font-semibold"
        >
          Sign Up
        </Link>
      </p>

      <div className="mt-2">
        <GoogleButton
          onClick={handleGoogleLogin}
          disabled={email || password}
        />
      </div>
    </form>
  </div>
</div>


  )
}

export default LoginForm
