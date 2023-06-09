import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnonym from "./components/IsAnonym";
import IsPrivate from "./components/IsPrivate";
import ActivityFilterPage from "./pages/FilterPage";
import ActivityDetailsEdit from "./components/ActivityDetailsEdit";
import AddActivity from "./components/AddActivity";
import ProfilePage from "./pages/ProfilePage";
import ActivityDetails from "./components/ActivityDetails";
import TermsPrivacyPage from "./pages/TermsPrivacyPage";
import AboutPage from "./pages/AboutPage";
import { API_URL } from "./config/config";
import { SnackbarProvider } from "notistack";

console.info({
  API_URL,
  REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  REACT_APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
});

// Get the root element
var r = document.querySelector(":root");

document.addEventListener("mousemove", (event) => {
  const gradientValue = (event.screenX / window.screen.width) * 100;
  const gradientValueHeight = (event.screenY / window.screen.height) * 100;
  r.style.setProperty("--gradient-one", gradientValue + "%");
  r.style.setProperty("--gradient-two", gradientValueHeight + "%");
  // console.log("data mouseeeeeeeeee", gradientValue);
});

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Navbar />
        <NavbarMobile />

        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route
            exact
            path="/activitysearch"
            element={
              <IsPrivate>
                <ActivityFilterPage />
              </IsPrivate>
            }
          />

          <Route
            exact
            path="/activities/edit/:activityId"
            element={
              <IsPrivate>
                <ActivityDetailsEdit />
              </IsPrivate>
            }
          />

          <Route
            exact
            path="/activities/:activityId"
            element={
              <IsPrivate>
                <ActivityDetails />
              </IsPrivate>
            }
          />

          <Route
            exact
            path="/activities"
            element={
              <IsPrivate>
                <AddActivity />
              </IsPrivate>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <IsPrivate>
                <ProfilePage />
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

          <Route
            path="/termsconditions"
            element={
              <IsAnonym>
                <TermsPrivacyPage />
              </IsAnonym>
            }
          />

          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
