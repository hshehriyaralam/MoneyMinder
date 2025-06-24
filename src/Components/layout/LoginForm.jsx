import React, { useContext,  useRef, useState } from 'react'
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
    <div className="h-screen bg-transparent flex  justify-center items-center  ">
  <div className="w-full max-w-4xl bg-transparent  backdrop-blur-lg  rounded-lg  overflow-hidden flex flex-col p-2">

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
          <GoogleButton onClick={handleGoogleLogin}  disabled={email || password} />
          </div>
          
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default LoginForm
