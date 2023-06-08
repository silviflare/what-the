import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";
import { useSnackbar } from "notistack";

// Material UI
import {
  Button,
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
  Box,
} from "@mui/material";
import { SelectType } from "./SelectType";
import { SelectTime } from "./SelectTime";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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

function ActivityDetailsEdit(props) {
  const [type, setType] = useState([]);
  const [time, setTime] = useState([]);
  const [space, setSpace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [mapsLink, setMapsLink] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const [liked, setLiked] = useState(false);
  const { activityId } = useParams();

  const [activity, setActivity] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const spaces = ["indoor", "outdoor"];

  const neighborhoods = [
    "Brandenburg",
    "Charlottenburg",
    "Friedrichshain",
    "Kreuzberg",
    "Köpenick",
    "Lichtenberg",
    "Moabit",
    "Marzahn",
    "Mitte",
    "Neukölln",
    "Pankow",
    "Prenzlauer Berg",
    "Tempelhof",
    "Treptow",
    "Reinickendorf",
    "Schöneberg",
    "Spandau",
    "Steglitz",
    "Wedding",
    "Wilmersdorf",
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
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [activityId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      type,
      time,
      space,
      neighborhood,
      name,
      description,
      address,
      mapsLink,
    };

    // PUT request to update the project
    axios
      .put(`${API_URL}/api/activities/${activityId}`, requestBody)
      .then((response) => {
        enqueueSnackbar("Updated activity", { variant: "success" });
        navigate(`/profile`);
      });
  };

  const deleteActivity = () => {
    // Make a DELETE request to delete the project
    axios
      .delete(`${API_URL}/api/activities/${activityId}`)
      .then(() => {
        enqueueSnackbar("Deleted activity", { variant: "success" });
        navigate(`/profile`);
      })
      .catch((err) => console.log(err));
  };

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

  if (loading) return null;

  if (!activity && !loading) {
    return (
      <Box mt={40}>
        <h1>Activity not found :(</h1>
      </Box>
    );
  }

  return (
    <div className="container-all">
      <div className="crud-title crud-title-like">
        <h1>{activity.name}</h1>
        <IconButton className="activity-title-like-button" onClick={handleLike}>
          {liked ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon color="error" />
          )}
        </IconButton>
      </div>
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Name activity"
              variant="outlined"
              name="Name activity"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Description activity"
              variant="outlined"
              name="Description activity"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectType value={type} setValue={setType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Neighborhood
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={neighborhood}
                onChange={(e) => {
                  setNeighborhood(e.target.value);
                }}
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
              fullWidth
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name="address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Link to Google Maps"
              variant="outlined"
              name="mapsLink"
              defaultValue={mapsLink}
              onChange={(e) => setMapsLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectTime value={time} setValue={setTime} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Indoor/Outdoor
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={space}
                onChange={(e) => {
                  setSpace(e.target.value);
                }}
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
        <Grid className="activity-buttons" container spacing={2}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              color="primary"
            >
              Save changes
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={deleteActivity}
            >
              Delete activity
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default ActivityDetailsEdit;
