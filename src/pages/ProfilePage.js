import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import AddActivity from "../components/AddActivity";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

// Styling Material UI
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ProfilePage(props) {
  const [favs, setFavs] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const [visible, setVisible] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);

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
    <div className="container-all">
      {user && (
        <>
          <div className="profile-infos-user">
            <h1>Hello {user.name} !</h1>
            <p>Your email is: {user.email}</p>

            <Button variant="contained" onClick={() => setVisible(!visible)}>
              Add activity
            </Button>
            {visible && <AddActivity onCreateSuccess={getMyActivities} />}

            <Button variant="outlined" onClick={logOutUser}>
              Logout
            </Button>
          </div>

          <div className="profile-container-lists">
            {/* Map over my favs */}
            <div className="one-list-profile">
              <h2>My favs</h2>
              <List>
                {favs.map((fav) => {
                  return (
                    <ListItem
                      key={fav._id}
                      secondaryAction={
                        <IconButton edge="start" aria-label="fav">
                          <FavoriteBorderIcon color="error" />
                        </IconButton>
                      }
                      disablePadding
                    >
                      {/* <ListItemButton to={`/activities/${activity._id}`}> */}
                      <ListItemButton>
                        <ListItemText primary={fav.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>

            {/* Map over the activities the user made */}
            <div className="one-list-profile">
              <h2>My activities</h2>

              <List>
                {myActivities.map((activity) => {
                  return (
                    <ListItemButton key={activity._id}>
                      <ListItemText primary={activity.name} />
                    </ListItemButton>
                  );
                })}
              </List>
            </div>
          </div>
        </>
      )}

      {/*       <Button variant="contained" onClick={() => setVisible(!visible)}>
        Add activity
      </Button>
      {visible && <AddActivity onCreateSuccess={getMyActivities} />} */}
    </div>
  );
}

export default ProfilePage;
