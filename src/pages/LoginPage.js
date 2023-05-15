import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "./../services/auth.service";

function LoginPage(props) {
  const [email, setEmail] = useState("silvia@gmail.com"); // TODO: delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [password, setPassword] = useState("Asdf_1234"); // TODO: delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService // instead of axios
      .login(requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken

        storeToken(response.data.authToken);
        authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
