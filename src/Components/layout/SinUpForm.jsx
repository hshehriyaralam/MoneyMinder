import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../comman/InputVerse.jsx";
import GoogleButton from "../UIverse/GoogleButto.jsx";
import axios from "axios";
import { useAlert } from "../../Context/AlertContext.jsx";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      //check email format
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmailValid) {
        showAlert("error", "Please Enter Valid email");
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/user/signup`,
        {
          fullName: fullName,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      setFullName("");
      setEmail("");
      setPassword("");
      Navigate("/Login");
    } catch (error) {
      if (error.response?.status === 400) {
        showAlert("error", "ALL filed is Required");
      } else if (error.response?.status === 409) {
        showAlert("error", "User Already Exist");
      } else {
        showAlert("error", "Something Went Wrong");
      }
    }
  };

  const handleGoogleLogin = () => {
    if (email || password) {
      showAlert("error", "Please clear email and password first");
      return;
    }

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
      scope: "email profile openid",
      callback: async (tokenResponse) => {
        if (tokenResponse.error || !tokenResponse.access_token) {
          showAlert("error", "Google login was cancelled or failed");
          return;
        }

        try {
          const res = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            },
          );

          await axios.post(
            `${API_BASE_URL}/api/user/google-auth`,
            {
              userInfo: res.data,
            },
            {
              withCredentials: true,
            },
          );
          // showAlert('success', 'Successfully signup with Google');
          Navigate("/");
        } catch (err) {
          console.error("Google login error:", err);
          showAlert("error", "Google login failed");
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
          <h1>Create your account</h1>
          <p className="label">A clearer view of where your money goes.</p>
        </div>
        <form className="auth-form" onSubmit={handleSignUp}>
          <Input
            type="text"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <button className="btn auth-submit" type="submit">Create account</button>
          <p className="auth-switch">
            Already have an account? <Link to="/Login">Log in</Link>
          </p>
          <div className="auth-google">
            <GoogleButton onClick={handleGoogleLogin} disabled={Boolean(email || password)} />
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
