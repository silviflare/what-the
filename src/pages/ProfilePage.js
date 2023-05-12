import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import AddActivity from "../components/AddActivity";
import Button from "@mui/material/Button";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ProfilePage(props) {
  const [favs, setFavs] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [visible, setVisible] = useState(false);
  const { user } = useContext(AuthContext);

  const getFavs = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/myFavs`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const activities = response.data;
        setFavs(activities);
      })
      .catch((err) => console.log(err));
  };

  const getMyActivities = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/myActivities`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const activities = response.data;
        setMyActivities(activities);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFavs();
    getMyActivities();
  }, []);

  return (
    <div className="profile-user">
      {user && (
        <>
          <h1>Hello {user.name} !</h1>
          <p>Your email is: {user.email}</p>
          <p>My favs</p>
          {favs.map((fav) => (
            <div key={fav._id}>
              <h3>{fav.name}</h3>
            </div>
          ))}
          <p>My activities</p>
          {myActivities.map((activity) => (
            <div key={activity._id}>
              <h3>{activity.name}</h3>
            </div>
          ))}
        </>
      )}

      <Button variant="contained" onClick={() => setVisible(!visible)}>
        {" "}
        Add activity{" "}
      </Button>

      {visible && <AddActivity onCreateSuccess={getMyActivities} />}

      {/* Map over the activities the user made */}
    </div>
  );
}

export default ProfilePage;
