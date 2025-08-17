import { useState, useEffect } from "react";
import "./index.css";
import PropTypes from "prop-types";
import supabase from "../helper/supabaseClient";

const LandingPage = ({ onAuthSuccess }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowWelcome(true), 300);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    const email = e.target["login-email"].value;
    const password = e.target["login-password"].value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoginLoading(false);
    if (error) {
      setLoginError(error.message);
    } else {
      if (onAuthSuccess) onAuthSuccess();
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);
    const name = e.target["signup-name"].value;
    const email = e.target["signup-email"].value;
    const password = e.target["signup-password"].value;
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    setSignupLoading(false);// For showing the signing up.. part and disabling the signup button while signup is in progress to avoid double submissions
    if (error) {
      setSignupError(error.message);
    } else {
      if (onAuthSuccess) onAuthSuccess();
    }
  };

  return (
    <div className="landing-bg">
      <div className={`welcome-text ${showWelcome ? "fade-in" : ""}`}>
        Welcome to <span>CELEBRATE HUB</span>
      </div>
      <div className="illustrations">
        <div className="illustration-card">
          <img src="/birthday.jpg" alt="Birthday Party" className="illustration-img" />
          <div className="event-name">Birthday</div>
        </div>
        <div className="illustration-card">
          <img src="/gamenight.jpg" alt="Game Night" className="illustration-img" />
          <div className="event-name">Game Night</div>
        </div>
        <div className="illustration-card">
          <img src="/wedding.jpg" alt="Wedding" className="illustration-img" />
          <div className="event-name">Wedding</div>
        </div>
        <div className="illustration-card">
          <img src="/camping.jpg" alt="Camping" className="illustration-img" />
          <div className="event-name">Camping</div>
        </div>
        <div className="illustration-card">
          <img src="/anniversary.jpg" alt="Anniversary" className="illustration-img" />
          <div className="event-name">Anniversary</div>
        </div>
      </div>
      <div className="button-group">
        <button className="popup-btn" onClick={() => setShowLogin(true)}>
          Login
        </button>
        <button className="popup-btn" onClick={() => setShowSignup(true)}>
          Signup
        </button>
      </div>
      {showLogin && (
        <div className="popup-overlay" onClick={() => setShowLogin(false)}>
          <div className="popup-modal" onClick={e => e.stopPropagation()}>
            <h2>Login</h2>
            {loginError && <div className="auth-alert">{loginError}</div>}
            <form className="auth-form" onSubmit={handleLogin}>
              <label htmlFor="login-email" className="auth-label">Email</label>
              <input id="login-email" type="email" className="auth-input" autoComplete="email" />
              <label htmlFor="login-password" className="auth-label">Password</label>
              <input id="login-password" type="password" className="auth-input" autoComplete="current-password" />
              {/* Submit button. Shows "Logging in..." and disables itself while loading. */}
              <button type="submit" className="auth-submit" disabled={loginLoading}>
                {loginLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <button onClick={() => setShowLogin(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
      {showSignup && (
        <div className="popup-overlay" onClick={() => setShowSignup(false)}>
          <div className="popup-modal" onClick={e => e.stopPropagation()}>
            <h2>Signup</h2>
            {signupError && <div className="auth-alert">{signupError}</div>}
            <form className="auth-form" onSubmit={handleSignup}>
              <label htmlFor="signup-name" className="auth-label">Name</label>
              <input id="signup-name" type="text" className="auth-input" autoComplete="name" />
              <label htmlFor="signup-email" className="auth-label">Email</label>
              <input id="signup-email" type="email" className="auth-input" autoComplete="email" />
              <label htmlFor="signup-password" className="auth-label">Password</label>
              <input id="signup-password" type="password" className="auth-input" autoComplete="new-password" />
              <button type="submit" className="auth-submit" disabled={signupLoading}>{signupLoading ? "Signing up..." : "Signup"}</button>
            </form>
            <button onClick={() => setShowSignup(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

LandingPage.propTypes = {
  onAuthSuccess: PropTypes.func,
};

export default LandingPage;
