import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ListItemLike from "../components/ListItemLike";

// Styling Material UI
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link, useNavigate } from "react-router-dom";

// Profile Page funtion

function ProfilePage(props) {
  const [favs, setFavs] = useState([]);
  const [myActivities, setMyActivities] = useState([]);
  const { user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();

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
            <div>
              <h1>Hello {user.name} !</h1>
              <p>Your email is: {user.email}</p>
            </div>

            {/* <Button variant="contained" onClick={() => setVisible(!visible)}>
              Add activity
            </Button>
            {visible && <AddActivity onCreateSuccess={getMyActivities} />} */}

            <div>
              <Link to="/activities">
                <Button size="small" variant="contained">
                  Add activity
                </Button>
              </Link>

              <Button size="small" variant="outlined" onClick={logOutUser}>
                Logout
              </Button>
            </div>
          </div>

          <div className="profile-container-lists">
            {/* Map over my favs */}
            <div className="one-list-profile">
              <h2>My favs</h2>
              <List>
                {favs.map((fav) => {
                  return (
                    <ListItemLike
                      activity={fav}
                      key={fav._id}
                      onLikeToogle={getFavs}
                    />
                  );
                })}
              </List>
            </div>

            {/* Map over the activities the user made */}
            <div className="one-list-profile">
              <h2>My created activities</h2>

              <List>
                {myActivities.map((activity) => {
                  return (
                    <ListItem
                      key={activity._id}
                      secondaryAction={
                        <IconButton
                          onClick={() =>
                            navigate(`/activities/edit/${activity._id}`)
                          }
                          edge="start"
                          aria-label="edit"
                        >
                          <ModeEditIcon />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton to={`/activities/${activity._id}`}>
                        <ListItemText primary={activity.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
