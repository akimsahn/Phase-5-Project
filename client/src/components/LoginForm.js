import React, { useState } from "react";

function LoginForm({ setUser, setCollections }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        /><br/>
        <div className="flex-column-center">
          {errors.map((err) => (
            <p className="error">{err}</p>
          ))}
          <button type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
    </form>
  );
}

export default LoginForm;
