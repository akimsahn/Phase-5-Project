import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage({ setUser, setCollections }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login-page">
      <h1 className="nav-left">Welcome to QuiXtudy</h1>
      <h2>Log in or sign up to get started!</h2>
      {showLogin ? (
        <div className="card">
          <h3 className="title">Login to Existing Account</h3>
          <LoginForm setUser={setUser} setCollections={setCollections} />
          <div className="flex-column-center">
            <br/>
            <p>Don't have an account?</p>
            <button className="pink-button" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <h3 className="title">Create a New Account</h3>
          <SignUpForm setUser={setUser} setCollections={setCollections} />
          <div className="flex-column-center">
            <br/>
            <p>Already have an account?</p>
            <button className="pink-button" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
