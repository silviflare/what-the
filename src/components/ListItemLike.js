import axios from "axios";
import { API_URL } from "../config/config";
import { useState } from "react";

import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ListItemLike(props) {
  const activity = props.activity;
  const activityId = activity._id;

  const [liked, setLiked] = useState(activity.isLiked);

  const handleLike = () => {
    // Perform the "like" action
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/like/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Update the liked state
        setLiked(!liked);
        props.onLikeToogle?.();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ListItem
      key={activityId}
      secondaryAction={
        <IconButton onClick={handleLike}>
          {liked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon color="error" />
          )}
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton to={`/activities/${activityId}`}>
        <ListItemText primary={activity.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemLike;
