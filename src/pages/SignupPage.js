import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "./../services/auth.service";

// Material UI
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    authService // instead of axios
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
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
          <div className="signin-content">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
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
                    // helperText="Some important text"
                    value={password}
                    onChange={handlePassword}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    type="name"
                    name="name"
                    value={name}
                    onChange={handleName}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="By signing up, you agree to the Terms of Service and Privacy Policy."
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Box mt={4} mb={4}>
              Already have account? <Link to={"/login"}> Login</Link>
            </Box>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default SignupPage;
