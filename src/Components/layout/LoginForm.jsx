import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Input from "../comman/InputVerse.jsx";
import GoogleButton from "../UIverse/GoogleButto.jsx"
import axios from 'axios';
import { useAlert } from "../../Context/AlertContext.jsx";
import { Logo } from "../../ui/primitives.jsx";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");





const LoginForm = () => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const Navigate = useNavigate()
  const { showAlert } = useAlert();

  
const handleLogin = async (e) => {
  e.preventDefault()
  if (isSubmitting) return

  setIsSubmitting(true)
  try{
    await  axios.post(`${API_BASE_URL}/api/user/login`, {
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
      console.log("Login failed",error.message);
      if(error.response?.status === 401){
        showAlert("error", "Invalid Email Or Password");
      }else if(error.response?.status === 404){
        showAlert("error", "This Email is not Registerd");
      }else{
        showAlert("error", "Server Failed");
      }
  } finally {
    setIsSubmitting(false)
  }
}


const handleGoogleLogin = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    showAlert("error", "Google login is not configured");
    return;
  }
  if (!window.google?.accounts?.oauth2) {
    showAlert("error", "Google login is not ready. Please try again.");
    return;
  }

  // TokenClient init only now — NOT on page load
  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: googleClientId,
    scope: 'email profile openid',
    callback: async (tokenResponse) => {
      if (tokenResponse.error || !tokenResponse.access_token) {
        showAlert("error", "Google login was cancelled or failed");
        return;
      }

      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        await axios.post(`${API_BASE_URL}/api/user/google-auth`, {
          userInfo: res.data
        }, {
          withCredentials: true,
        });
        // showAlert('success', 'Successfully Login with Google');
        Navigate('/');
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
<main className="auth-wrap">
  <section className="card auth-card">
    <div className="auth-brand">
      <div className="auth-logo">
        <Logo className="auth-logo-mark" />
        <span>MoneyMinder</span>
      </div>
      <h1>Welcome back</h1>
      <p className="label">Sign in to keep your finances in view.</p>
    </div>
    <form className="auth-form" onSubmit={handleLogin}>
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
      <button className="btn auth-submit" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting && <span className="auth-spinner" aria-hidden="true" />}
        <span aria-live="polite">{isSubmitting ? "Logging in..." : "Log in"}</span>
      </button>
      <p className="auth-switch">
        Don’t have an account? <Link to="/SignUp">Sign up</Link>
      </p>
      <div className="auth-google">
        <GoogleButton onClick={handleGoogleLogin} />
      </div>
    </form>
  </section>
</main>
  )
}

export default LoginForm
