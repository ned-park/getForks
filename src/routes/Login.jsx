import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(username, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="username"> Username:</label>
      <input
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
