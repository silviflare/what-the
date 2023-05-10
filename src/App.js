import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnonym from "./components/IsAnonym";
import IsPrivate from "./components/IsPrivate";
import ActivityFilterPage from "./pages/FilterPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/activities"
          element={
            <IsPrivate>
              <ActivityFilterPage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnonym>
              <SignupPage />
            </IsAnonym>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnonym>
              <LoginPage />
            </IsAnonym>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
