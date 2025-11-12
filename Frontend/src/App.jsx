import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Navigate
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Samples from "./pages/Samples";
import Colorization from "./pages/Colorization";
import "./styles.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      const u = JSON.parse(raw);
      setLoggedIn(true);
      setUser(u.username);
    }
  }, []);

  // Logout handler
  const signout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser("");
  };

  // ✅ Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!loggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div className="app-shell">
      <Navbar loggedIn={loggedIn} onSignout={signout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/samples" element={<Samples/>}/>
        <Route
          path="/colorize"
          element={
            <ProtectedRoute>
              <Colorization loggedIn={loggedIn} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}
