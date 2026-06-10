import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">

        <Link
          className="navbar-brand"
          to="/dashboard"
        >
          AI Study Companion
        </Link>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;