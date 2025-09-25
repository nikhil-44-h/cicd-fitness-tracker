import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <p className="logo">🏋️‍♀️HEALTH TRACKER</p>
      </Link>
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="nav-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="nav-btn">Register</button>
            </Link>
          </>
        ) : (
          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
