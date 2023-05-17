import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="App">
      <Navbar />

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

        <Route
          path="/contact"
          element={
            <IsAnonym>
              <ContactPage />
            </IsAnonym>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
