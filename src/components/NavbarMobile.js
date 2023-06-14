import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

// Material UI
import { Button } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar-mobile">
      <div className="nav-container">
        <div className="logo-container">
          <Link className="logo-navbar" to="/">
            <img src="/what-the-logo.gif" alt="what-the-logo" />
          </Link>
        </div>

        {/* <div className="menu-icon" onClick={handleShowNavbar}>
          <img src="/menu_icon.svg" alt="menu-icon" />
        </div> */}

        <div className="menu-icon">
          <button
            className={`mobile-menu ${showNavbar ? `mobile-menu-open` : ``}`}
            onClick={handleShowNavbar}
          >
            <div className="bar-one" />
            <div className="bar-two" />
            <div className="bar-three" />
          </button>
        </div>
      </div>

      <div
        className={`nav-mobile-elements-container ${
          showNavbar && "nav-mobile-elements-container-open"
        }`}
      >
        {isLoggedIn && (
          <div className="nav-mobile-elements">
            <Link to="/activitysearch">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleShowNavbar}
              >
                Activity filter
              </Button>
            </Link>

            <Link to={`/profile`}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                onClick={handleShowNavbar}
              >
                <Person2Icon />
                &nbsp; <span> {user && user.name}</span>
              </Button>
            </Link>

            <Link to="/about">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleShowNavbar}
              >
                About
              </Button>
            </Link>

            {/* <Button variant="outlined" onClick={logOutUser}>
              Logout
            </Button> */}
          </div>
        )}

        {!isLoggedIn && (
          <div className="nav-mobile-elements">
            <Link to="/signup">
              <Button
                variant="outlined"
                onClick={() => {
                  handleShowNavbar();
                }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleShowNavbar}
              >
                Log In
              </Button>
            </Link>
            <Link to="/about">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleShowNavbar}
              >
                About
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
