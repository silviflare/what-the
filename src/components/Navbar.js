import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

// Material UI
import { Button } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-container">
          <Link className="logo-navbar" to="/">
            <img src="/what-the-logo.gif" alt="what-the-logo" />
          </Link>
        </div>
        <div className="nav-right-container-all">
          {isLoggedIn && (
            <div className="nav-right-container">
              <Link to="/activitysearch">
                <Button type="submit" variant="contained" color="primary">
                  Activity filter
                </Button>
              </Link>

              <Link to="/about">
                <Button type="submit" variant="contained" color="primary">
                  About
                </Button>
              </Link>

              <Link to={`/profile`}>
                <Button type="submit" variant="outlined" color="primary">
                  <Person2Icon />
                  &nbsp; <span> {user && user.name}</span>
                </Button>
              </Link>

              {/* <Button variant="outlined" onClick={logOutUser}>
              Logout
            </Button> */}
            </div>
          )}

          {!isLoggedIn && (
            <div className="nav-right-container">
              <Link to="/about">
                <Button type="submit" variant="contained" color="primary">
                  About
                </Button>
              </Link>
              <Link to="/login">
                <Button type="submit" variant="contained" color="primary">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outlined" onClick={logOutUser}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
