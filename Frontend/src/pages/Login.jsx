import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedIn, setUser }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await login(u, p);
      localStorage.setItem("user", JSON.stringify({ username: u }));
      setLoggedIn(true);
      setUser(u);
      navigate("/");
    } catch (err) {
      setMsg("Invalid username or password.");
    }
  };

  return (
    <div className="login-container page-bg">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">
          Please log in to access the colorization feature.
        </p>

        <form className="login-form" onSubmit={submit}>
          <label className="login-label">Username</label>
          <input
            className="login-input"
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <label className="login-label">Password</label>
          <div className="password-wrapper">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈 Hide" : "👁️ Show"}
            </button>
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          {msg && <div className="login-error">{msg}</div>}
        </form>
      </div>
    </div>
  );
}
