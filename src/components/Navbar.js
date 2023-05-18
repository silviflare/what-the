import { Link } from "react-router-dom";
import { useContext } from "react";
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
            {/* <img src="./what-the-3.png" alt="what-the-logo" /> */}
            <img src="/what-the-3.svg" alt="what-the-logo" />
          </Link>
        </div>

        {isLoggedIn && (
          <div className="nav-right-container">
            <Link to="/activitysearch">
              <Button type="submit" variant="contained" color="primary">
                Activity filter
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
    </nav>
  );
}

export default Navbar;
