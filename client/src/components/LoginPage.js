import { useState } from "react";
import About from "./About";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage({ setUser, setCollections }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="login-page">
      {showAbout ? (
        <div className="padding flex-column-center">
          <About />
          <button onClick={() => setShowAbout(false)}>Let's Get Started!</button>
        </div>
      ) : (
        <div className="padding flex-column-center">
          <h1 className="logo center">Welcome to QuiXtudy</h1>
          <h2>Log in or sign up to get started!</h2>
          {showLogin ? (
            <div className="card flex-column-space-between">
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
            <div className="card flex-column-space-between">
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
          <button className="plain-button" onClick={() => setShowAbout(true)}>about</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
