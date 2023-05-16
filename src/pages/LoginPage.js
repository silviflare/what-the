import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "./../services/auth.service";

// Material UI
import { Box, Button, Container, Grid, TextField } from "@mui/material";

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
    <div className="container-center">
      <div className="container-small">
        <Container maxWidth="sm">
          <div className="login-content">
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="Email"
                    value={email}
                    onChange={handleEmail}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="Password"
                    value={password}
                    onChange={handlePassword}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Log in
                  </Button>
                </Grid>
              </Grid>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Box mt={4} mb={4}>
              Don't have an account yet? <Link to={"/signup"}> Sign Up</Link>
            </Box>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default LoginPage;
