import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";

// Material UI
import {
  IconButton,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Checkbox,
} from "@mui/material";
import { SelectType } from "./SelectType";
import { SelectTime } from "./SelectTime";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../context/auth.context";

// Settings Material UI
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// ActivityDetails funtion

function ActivityDetails(props) {
  const [type, setType] = useState([]);
  const [time, setTime] = useState([]);
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");

  const [liked, setLiked] = useState(false);
  const { activityId } = useParams();

  const [activity, setActivity] = useState(null);

  const { user } = useContext(AuthContext);
  const isFromUser = user?._id === activity?.createdBy;

  const navigate = useNavigate();

  const spaces = ["indoor", "outdoor"];

  const neighborhoods = [
    "Mitte",
    "Neukölln",
    "Friedrichshain",
    "Kreuzberg",
    "Charlottenburg",
    "Wilmersdorf",
    "Pankow",
    "Prenzlauer Berg",
    "Lichtenberg",
    "Tempelhof",
    "Schöneberg",
    "Treptow",
    "Köpenick",
    "Steglitz",
    "Marzahn",
    "Reinickendorf",
    "Spandau",
    "Brandenburg",
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/activities/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneActivity = response.data;
        setActivity(oneActivity);
        setLiked(oneActivity.isLiked);
        setType(oneActivity.type || []);
        setTime(oneActivity.time);
        setSpace(oneActivity.space);
        setNeighborhood(oneActivity.neighborhood);
        setName(oneActivity.name);
        setDescription(oneActivity.description);
        setAddress(oneActivity.address);
        setMapsLink(oneActivity.mapsLink);
      })
      .catch((error) => console.log(error));
  }, [activityId]);

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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!activity) {
    return (
      <div>
        <h1>There are not activities</h1>
      </div>
    );
  }

  return (
    <div className="container-all">
      <div className="crud-title crud-title-like">
        <h1>{activity.name}</h1>
        <div>
          {isFromUser && (
            <IconButton
              className="activity-title-like-button"
              onClick={() => navigate(`/activities/edit/${activity._id}`)}
            >
              <EditIcon />
            </IconButton>
          )}

          <IconButton
            className="activity-title-like-button"
            onClick={handleLike}
          >
            {liked ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </IconButton>
        </div>
      </div>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              disabled
              id="outlined-basic"
              label="Name activity"
              variant="outlined"
              name="Name activity"
              defaultValue={name}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              fullWidth
              disabled
              id="outlined-basic"
              label="Description activity"
              variant="outlined"
              name="Description activity"
              defaultValue={description}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectType value={type} setValue={setType} disabled />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Neighborhood
              </InputLabel>
              <Select
                disabled
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={neighborhood}
                input={<OutlinedInput label="Neighborhood" />}
                renderValue={(selected) => selected}
                MenuProps={MenuProps}
              >
                {neighborhoods.map((neighborhoodMap) => (
                  <MenuItem key={neighborhoodMap} value={neighborhoodMap}>
                    <ListItemText primary={neighborhoodMap} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              defaultValue={address}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled
              id="outlined-basic"
              label="Link to Google Maps"
              variant="outlined"
              name="mapsLink"
              defaultValue={mapsLink}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectTime value={time} setValue={setTime} disabled />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Indoor/Outdoor
              </InputLabel>
              <Select
                disabled
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={space}
                input={<OutlinedInput label="Indoor/Outdoor" />}
                renderValue={(selected) => selected}
                MenuProps={MenuProps}
              >
                {spaces.map((spaceMap) => (
                  <MenuItem key={spaceMap} value={spaceMap}>
                    <Checkbox checked={space.indexOf(spaceMap) > -1} />
                    <ListItemText primary={spaceMap} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ActivityDetails;
