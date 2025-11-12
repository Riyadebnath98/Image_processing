import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await register(u, p);
      setMsg(data?.message || "Registration successful.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="register-container page-bg">
      <div className="register-card">
        <h1 className="register-title">Create an Account</h1>
        <p className="register-subtitle">
          Join us and start colorizing your images instantly.
        </p>

        <form className="register-form" onSubmit={submit}>
          <label className="register-label">Username</label>
          <input
            className="register-input"
            value={u}
            onChange={(e) => setU(e.target.value)}
            placeholder="Choose a username"
            required
          />

          <label className="register-label">Password</label>
          <div className="password-wrapper">
            <input
              className="register-input"
              type={showPassword ? "text" : "password"}
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="register-btn" type="submit">
            Create Account
          </button>

          {msg && <div className="register-msg">{msg}</div>}

          <p className="register-note">
            Already have an account? <a href="/login">Login here</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
