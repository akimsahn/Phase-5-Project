import React, { useState } from "react";

function SignUpForm({ setUser, setCollections }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then(user => {
          setUser(user)
          setCollections(user.collections)
        });
      } else {
        r.json().then(err => setErrors(err.errors));
      }
    });
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>Username:</label><br/>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      /><br/>
      <label>Password:</label><br/>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        placeholder="Enter password"
      /><br/>
      <label>Confirm Password:</label><br/>
      <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        autoComplete="current-password"
        placeholder="Confirm password"
      /><br/>
      <div className="flex-column-center">
        {errors.map((err) => (
          <p className="error">{err}</p>
        ))}
        <button type="submit">
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
