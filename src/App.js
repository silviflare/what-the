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

// Mouse effect

let gradient1 = 50;
let gradient2 = 50;

let gradient1To = 50;
let gradient2To = 50;

const trailingSpeed = 18;

document.addEventListener("mousemove", (event) => {
  gradient1To = (event.screenX / window.screen.width) * 100;
  gradient2To = (event.screenY / window.screen.height) * 100;
});

const animateOuterCursor = () => {
  gradient1 += (gradient1To - gradient1) / trailingSpeed;
  gradient2 += (gradient2To - gradient2) / trailingSpeed;
  r.style.setProperty("--gradient-one", gradient1 + "%");
  r.style.setProperty("--gradient-two", gradient2 + "%");

  requestAnimationFrame(animateOuterCursor);
};

requestAnimationFrame(animateOuterCursor);

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <div className="page-background"></div>
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
