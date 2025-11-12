import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar({ loggedIn, onSignout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (path) => () => navigate(path);
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand" onClick={go("/")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="logo" />
          <span className="brand-text">ColorifyAI</span>
        </div>

        <nav className="navlinks">
          <button
            className={`navbtn ${isActive("/") ? "active" : ""}`}
            onClick={go("/")}
          >
            🏠Home
          </button>
          <button
            className={`navbtn ${isActive("/samples") ? "active" : ""}`}
            onClick={go("/samples")}
          >
            🖼️Samples
          </button>
          <button
            className={`navbtn ${isActive("/colorize") ? "active" : ""}`}
            onClick={go("/colorize")}
          >
            🎨Colorization
          </button>

          {!loggedIn ? (
            <>
              <button className="navbtn primary-btn" onClick={go("/login")}>
                Login
              </button>
              <button className="navbtn secondary-btn" onClick={go("/register")}>
                Register
              </button>
            </>
          ) : (
            <button className="navbtn signout-btn" onClick={onSignout}>
              Signout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
