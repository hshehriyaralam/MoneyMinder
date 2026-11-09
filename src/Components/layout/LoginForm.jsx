import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../comman/InputVerse.jsx";
import GoogleButton from "../UIverse/GoogleButto.jsx";
import { useAlert } from "../../Context/AlertContext.jsx";
import { Logo } from "../../ui/primitives.jsx";
import useAppStore from "../../store/store.js";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logIn = useAppStore((state) => state.logIn);
  const googleLogIn = useAppStore((state) => state.googleLogIn);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await logIn({ email, password });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      if (error.response?.status === 401) {
        showAlert("error", "Invalid Email Or Password");
      } else if (error.response?.status === 404) {
        showAlert("error", "This Email is not Registerd");
      } else {
        showAlert("error", "Server Failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: googleClientId,
      scope: "email profile openid",
      callback: async (tokenResponse) => {
        if (tokenResponse.error || !tokenResponse.access_token) {
          showAlert("error", "Google login was cancelled or failed");
          return;
        }

        try {
          await googleLogIn(tokenResponse.access_token);
          navigate("/");
        } catch (error) {
          console.error("Google login error:", error);
          showAlert("error", "Google login failed");
        }
      },
    });

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
          <Input type="email" label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input type="password" label="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
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
  );
};

export default LoginForm;
